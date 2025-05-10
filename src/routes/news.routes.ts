import { Router } from 'express';
import auth from '../middleware/auth.middleware';

const router = Router();

// Get all news
router.get('/', auth, async (req, res) => {
  // TODO: Implement get all news logic
});

// Get news by ID
router.get('/:id', auth, async (req, res) => {
  // TODO: Implement get news by ID logic
});

// Create news
router.post('/', auth, async (req, res) => {
  // TODO: Implement create news logic
});

// Update news
router.put('/:id', auth, async (req, res) => {
  // TODO: Implement update news logic
});

// Delete news
router.delete('/:id', auth, async (req, res) => {
  // TODO: Implement delete news logic
});

export default router;
