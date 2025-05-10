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

// Get all entities
router.get(
  '/',
  auth,
  async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
      const entities = await prisma.entity.findMany({
        include: {
          pages: true,
          news: true,
          staff: true,
          layoutItem: true,
        },
      });
      res.json(entities);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  }
);

// Get entity by ID
router.get(
  '/:id',
  auth,
  async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
      const entity = await prisma.entity.findUnique({
        where: { id: parseInt(req.params.id) },
        include: {
          pages: true,
          news: true,
          staff: true,
          layoutItem: true,
        },
      });

      if (!entity) {
        res.status(404).json({ message: 'Entity not found' });
        return;
      }

      res.json(entity);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  }
);

// Create entity
router.post(
  '/',
  auth,
  upload.single('image'),
  [body('name').notEmpty(), body('slug').notEmpty(), body('meta').isObject()],
  async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
      }

      const { name, slug, meta } = req.body;
      const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

      const entity = await prisma.entity.create({
        data: {
          name,
          slug,
          meta: {
            ...meta,
            imageUrl,
          },
        },
      });

      res.status(201).json(entity);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  }
);

// Update entity
router.put(
  '/:id',
  auth,
  upload.single('image'),
  [
    body('name').optional(),
    body('slug').optional(),
    body('meta').optional().isObject(),
  ],
  async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
      }

      const { name, slug, meta } = req.body;
      const imageUrl = req.file ? `/uploads/${req.file.filename}` : undefined;

      const entity = await prisma.entity.update({
        where: { id: parseInt(req.params.id) },
        data: {
          name,
          slug,
          meta: {
            ...meta,
            ...(imageUrl && { imageUrl }),
          },
        },
      });

      res.json(entity);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  }
);

// Delete entity
router.delete(
  '/:id',
  auth,
  async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
      await prisma.entity.delete({
        where: { id: parseInt(req.params.id) },
      });
      res.json({ message: 'Entity deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  }
);

export default router;
