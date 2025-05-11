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

// Get all news
router.get(
  '/',
  auth,
  async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
      const news = await prisma.news.findMany({
        include: {
          entity: true,
        },
      });
      res.json(news);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  }
);

// Get news by entity slug
router.get(
  '/entity/:entitySlug',
  auth,
  async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
      const { entitySlug } = req.params;
      const { take } = req.query;

      const entity = await prisma.entity.findUnique({
        where: { slug: entitySlug },
      });

      if (!entity) {
        res.json([]);
        return;
      }

      const news = await prisma.news.findMany({
        where: { entityId: entity.id },
        include: {
          entity: true,
        },
        take: take ? parseInt(take as string) : undefined,
        orderBy: {
          id: 'desc',
        },
      });

      res.json(news);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  }
);

// Get news by slug
router.get(
  '/slug/:slug',
  auth,
  async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
      const { slug } = req.params;

      const news = await prisma.news.findFirst({
        where: { slug },
        include: {
          entity: true,
        },
      });

      if (!news) {
        res.status(404).json({ message: 'News not found' });
        return;
      }

      res.json(news);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  }
);

// Get news by ID
router.get(
  '/:id',
  auth,
  async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
      const news = await prisma.news.findUnique({
        where: { id: parseInt(req.params.id) },
        include: {
          entity: true,
        },
      });

      if (!news) {
        res.status(404).json({ message: 'News not found' });
        return;
      }

      res.json(news);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  }
);

// Create news
router.post(
  '/',
  auth,
  upload.single('image'),
  [
    body('title').notEmpty(),
    body('slug').notEmpty(),
    body('entityId').isInt(),
    body('details').isObject(),
  ],
  async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
      }

      const { title, slug, entityId, details } = req.body;
      const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

      const news = await prisma.news.create({
        data: {
          title,
          slug,
          entityId: parseInt(entityId),
          details: {
            ...details,
            imageUrl,
          },
        },
        include: {
          entity: true,
        },
      });

      res.status(201).json(news);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  }
);

// Update news
router.put(
  '/:id',
  auth,
  upload.single('image'),
  [
    body('title').optional(),
    body('slug').optional(),
    body('details').optional().isObject(),
  ],
  async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
      }

      const { title, slug, details } = req.body;
      const imageUrl = req.file ? `/uploads/${req.file.filename}` : undefined;

      const news = await prisma.news.update({
        where: { id: parseInt(req.params.id) },
        data: {
          title,
          slug,
          details: {
            ...details,
            ...(imageUrl && { imageUrl }),
          },
        },
        include: {
          entity: true,
        },
      });

      res.json(news);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  }
);

// Delete news
router.delete(
  '/:id',
  auth,
  async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
      await prisma.news.delete({
        where: { id: parseInt(req.params.id) },
      });
      res.json({ message: 'News deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  }
);

export default router;
