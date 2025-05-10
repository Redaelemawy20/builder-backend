import { Router, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import prisma from '../lib/prisma';
import auth from '../middleware/auth.middleware';
import { AuthenticatedRequest } from '../types';

const router = Router();

// Get all sections
router.get(
  '/',
  auth,
  async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
      const sections = await prisma.section.findMany({
        include: {
          pages: true,
          layouts: true,
        },
      });
      res.json(sections);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  }
);

// Get section by ID
router.get(
  '/:id',
  auth,
  async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
      const section = await prisma.section.findUnique({
        where: { id: parseInt(req.params.id) },
        include: {
          pages: true,
          layouts: true,
        },
      });

      if (!section) {
        res.status(404).json({ message: 'Section not found' });
        return;
      }

      res.json(section);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  }
);

// Create section
router.post(
  '/',
  auth,
  [
    body('name').notEmpty(),
    body('type').isIn(['nav', 'footer', 'news', 'section', 'persons']),
    body('content').isObject(),
  ],
  async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
      }

      const { name, type, content } = req.body;

      const section = await prisma.section.create({
        data: {
          name,
          type,
        },
        include: {
          pages: true,
          layouts: true,
        },
      });

      res.status(201).json(section);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  }
);

// Update section
router.put(
  '/:id',
  auth,
  [
    body('name').optional(),
    body('type')
      .optional()
      .isIn(['nav', 'footer', 'news', 'section', 'persons']),
    body('content').optional().isObject(),
  ],
  async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
      }

      const { name, type, content } = req.body;

      const section = await prisma.section.update({
        where: { id: parseInt(req.params.id) },
        data: {
          name,
          type,
        },
        include: {
          pages: true,
          layouts: true,
        },
      });

      res.json(section);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  }
);

// Delete section
router.delete(
  '/:id',
  auth,
  async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
      await prisma.section.delete({
        where: { id: parseInt(req.params.id) },
      });
      res.json({ message: 'Section deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  }
);

export default router;
