import { Router, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../lib/prisma';
import auth from '../middleware/auth.middleware';

const router = Router();

// Login route
router.post(
  '/login',
  [body('username').notEmpty(), body('password').notEmpty()],
  async (req: Request, res: Response): Promise<void> => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
      }

      const { username, password } = req.body;

      const credential = await prisma.cerdential.findUnique({
        where: { username },
        include: {
          user: true,
          role: {
            include: {
              permissions: {
                include: {
                  permission: true,
                },
              },
            },
          },
        },
      });

      if (!credential) {
        res.status(401).json({ message: 'Invalid username or password' });
        return;
      }

      const isMatch = await bcrypt.compare(password, credential.password);
      if (!isMatch) {
        res.status(401).json({ message: 'Invalid username or password' });
        return;
      }

      const token = jwt.sign(
        { id: credential.id },
        process.env.JWT_SECRET as string,
        { expiresIn: '1d' }
      );

      res.json({
        token,
        user: credential.user,
        role: credential.role,
      });
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  }
);

// Register route
router.post(
  '/register',
  [
    body('username').notEmpty(),
    body('password').notEmpty(),
    body('name').notEmpty(),
    body('slug').notEmpty(),
    body('data').isObject(),
  ],
  async (req: Request, res: Response): Promise<void> => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
      }

      const { username, password, name, slug, data } = req.body;

      // Check if username already exists
      const existingCredential = await prisma.cerdential.findUnique({
        where: { username },
      });

      if (existingCredential) {
        res.status(400).json({ message: 'Username already exists' });
        return;
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create user and credential
      const user = await prisma.user.create({
        data: {
          name,
          slug,
          data,
        },
      });

      const credential = await prisma.cerdential.create({
        data: {
          username,
          password: hashedPassword,
          userId: user.id,
        },
        include: {
          user: true,
          role: {
            include: {
              permissions: {
                include: {
                  permission: true,
                },
              },
            },
          },
        },
      });

      const token = jwt.sign(
        { id: credential.id },
        process.env.JWT_SECRET as string,
        { expiresIn: '1d' }
      );

      res.status(201).json({
        token,
        user: credential.user,
        role: credential.role,
      });
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  }
);

export default router;
