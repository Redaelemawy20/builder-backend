import { Router, Request, Response } from 'express';

import auth from '../middleware/auth.middleware';

const router = Router();

// Get all news
router.get('/', auth, async (req: Request, res: Response): Promise<void> => {
  // TODO: get all news
});

// Get news by entity slug
router.get(
  '/entity/:entitySlug',
  auth,
  async (req: Request, res: Response): Promise<void> => {
    // TODO: get news by entity slug
  }
);

// Get news by slug
router.get(
  '/slug/:slug',
  auth,
  async (req: Request, res: Response): Promise<void> => {
    // TODO: get news by slug
  }
);

// Get news by ID
router.get('/:id', auth, async (req: Request, res: Response): Promise<void> => {
  // TODO: get news by ID
});

// Create news
router.post('/', auth, async (req: Request, res: Response): Promise<void> => {
  // TODO: create news
});

// Update news
router.put('/:id', auth, async (req: Request, res: Response): Promise<void> => {
  // TODO: update news
});

// Delete news
router.delete(
  '/:id',
  auth,
  async (req: Request, res: Response): Promise<void> => {
    // TODO: delete news
  }
);

// Create news
router.post('/', auth, async (req: Request, res: Response): Promise<void> => {
  // TODO: create news
});

// Update news
router.put('/:id', auth, async (req: Request, res: Response): Promise<void> => {
  // TODO: update news
});

// Delete news
router.delete(
  '/:id',
  auth,
  async (req: Request, res: Response): Promise<void> => {
    // TODO: delete news
  }
);

export default router;
