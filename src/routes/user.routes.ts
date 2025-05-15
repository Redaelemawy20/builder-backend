import { Router, Request, Response } from 'express';
import { body } from 'express-validator';
import auth from '../middleware/auth.middleware';

const router = Router();

// Get all users
router.get('/', auth, async (req: Request, res: Response): Promise<void> => {
  // TODO: get all users
});

// Get user by ID
router.get('/:id', auth, async (req: Request, res: Response): Promise<void> => {
  // TODO: get user by ID
});

// Create user
router.post(
  '/',
  auth,
  [
    body('name').notEmpty(),
    body('slug').notEmpty(),
    body('data').isObject(),
    body('username').notEmpty(),
    body('password').notEmpty(),
  ],
  async (req: Request, res: Response): Promise<void> => {
    // TODO: create user
  }
);

// Update user
router.put('/:id', auth, async (req: Request, res: Response): Promise<void> => {
  // TODO: update user
});

// Delete user
router.delete(
  '/:id',
  auth,
  async (req: Request, res: Response): Promise<void> => {
    // TODO: delete user
  }
);

export default router;
