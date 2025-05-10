import { Router } from 'express';
import auth from '../middleware/auth.middleware';
import prisma from '../lib/prisma';
const router = Router();

// Get all users
router.get('/', auth, async (req, res) => {
  // TODO: Implement get all users logic
  const users = await prisma.user.findMany();
  res.json(users);
});

// Get user by ID
router.get('/:id', auth, async (req, res) => {
  // TODO: Implement get user by ID logic
});

// Update user
router.put('/:id', auth, async (req, res) => {
  // TODO: Implement update user logic
});

// Delete user
router.delete('/:id', auth, async (req, res) => {
  // TODO: Implement delete user logic
});

export default router;
