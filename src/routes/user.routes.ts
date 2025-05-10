import { Router, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import prisma from '../lib/prisma';
import auth from '../middleware/auth.middleware';
import { AuthenticatedRequest } from '../types';
import multer from 'multer';
import path from 'path';

const router = Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (
    _req: Request,
    _file: Express.Multer.File,
    cb: (error: Error | null, destination: string) => void
  ) => {
    cb(null, 'uploads/');
  },
  filename: (
    _req: Request,
    file: Express.Multer.File,
    cb: (error: Error | null, filename: string) => void
  ) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Get all users
router.get(
  '/',
  auth,
  async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
      const users = await prisma.user.findMany({
        include: {
          cerdential: true,
        },
      });
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  }
);

// Get user by ID
router.get(
  '/:id',
  auth,
  async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
      const user = await prisma.user.findUnique({
        where: { id: parseInt(req.params.id) },
        include: {
          cerdential: true,
        },
      });

      if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
      }

      res.json(user);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  }
);

// Create user
router.post(
  '/',
  auth,
  upload.single('image'),
  [
    body('name').notEmpty(),
    body('slug').notEmpty(),
    body('data').isObject(),
    body('username').notEmpty(),
    body('password').notEmpty(),
  ],
  async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
      }

      const { name, slug, data, username, password } = req.body;
      const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

      const user = await prisma.user.create({
        data: {
          name,
          slug,
          data: {
            ...data,
            imageUrl,
          },
        },
      });

      const credential = await prisma.cerdential.create({
        data: {
          username,
          password,
          userId: user.id,
        },
      });

      res.status(201).json({
        ...user,
        credential,
      });
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  }
);

// Update user
router.put(
  '/:id',
  auth,
  upload.single('image'),
  [
    body('name').optional(),
    body('slug').optional(),
    body('data').optional().isObject(),
  ],
  async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
      }

      const { name, slug, data } = req.body;
      const imageUrl = req.file ? `/uploads/${req.file.filename}` : undefined;

      const user = await prisma.user.update({
        where: { id: parseInt(req.params.id) },
        data: {
          name,
          slug,
          data: {
            ...data,
            ...(imageUrl && { imageUrl }),
          },
        },
        include: {
          cerdential: true,
        },
      });

      res.json(user);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  }
);

// Delete user
router.delete(
  '/:id',
  auth,
  async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
      await prisma.user.delete({
        where: { id: parseInt(req.params.id) },
      });
      res.json({ message: 'User deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  }
);

export default router;
