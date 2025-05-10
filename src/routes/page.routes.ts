import { Router, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import prisma from '../lib/prisma';
import auth from '../middleware/auth.middleware';
import { AuthenticatedRequest } from '../types';

const router = Router();

// Get all pages
router.get(
  '/',
  auth,
  async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
      const pages = await prisma.page.findMany({
        include: {
          entity: true,
          sections: true,
        },
      });
      res.json(pages);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  }
);

// Get page by ID
router.get(
  '/:id',
  auth,
  async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
      const page = await prisma.page.findUnique({
        where: { id: parseInt(req.params.id) },
        include: {
          entity: true,
          sections: true,
        },
      });

      if (!page) {
        res.status(404).json({ message: 'Page not found' });
        return;
      }

      res.json(page);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  }
);

// Create page
router.post(
  '/',
  auth,
  [
    body('name').notEmpty(),
    body('slug').notEmpty(),
    body('entityId').isInt(),
    body('meta').isObject(),
  ],
  async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
      }

      const { name, slug, entityId, meta } = req.body;

      const page = await prisma.page.create({
        data: {
          name,
          slug,
          entityId: parseInt(entityId),
        },
        include: {
          entity: true,
          sections: true,
        },
      });

      res.status(201).json(page);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  }
);

// Update page
router.put(
  '/:id',
  auth,
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

      const page = await prisma.page.update({
        where: { id: parseInt(req.params.id) },
        data: {
          name,
          slug,
        },
        include: {
          entity: true,
          sections: true,
        },
      });

      res.json(page);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  }
);

// Delete page
router.delete(
  '/:id',
  auth,
  async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
      await prisma.page.delete({
        where: { id: parseInt(req.params.id) },
      });
      res.json({ message: 'Page deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  }
);

// Add section to page
router.post(
  '/:id/sections',
  auth,
  [body('sectionId').isInt()],
  async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
      }

      const { sectionId } = req.body;
      const pageId = parseInt(req.params.id);

      const pageSection = await prisma.pageSections.create({
        data: {
          pageId,
          sectionId: parseInt(sectionId),
        },
      });

      res.status(201).json(pageSection);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  }
);

// Update page section
router.put(
  '/:pageId/sections/:sectionId',
  auth,
  [body('order').optional().isInt()],
  async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
      }

      const { order } = req.body;
      const pageId = parseInt(req.params.pageId);
      const sectionId = parseInt(req.params.sectionId);

      const pageSection = await prisma.pageSections.update({
        where: {
          id: parseInt(req.params.sectionId),
        },
        data: {
          order,
        },
      });

      res.json(pageSection);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  }
);

// Delete page section
router.delete(
  '/:pageId/sections/:sectionId',
  auth,
  async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
      const pageId = parseInt(req.params.pageId);
      const sectionId = parseInt(req.params.sectionId);

      await prisma.pageSections.delete({
        where: {
          id: parseInt(req.params.sectionId),
        },
      });

      res.json({ message: 'Section removed from page successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  }
);

export default router;
