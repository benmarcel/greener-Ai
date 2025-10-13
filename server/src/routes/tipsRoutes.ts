import express from 'express';
import {
  createTip,
  getAllTips,
  getTipById,
  updateTip,
  deleteTip,
  likeTip,
  addComment,
  getTopTips,
} from '../controllers/tipController';
import { authenticateToken } from '../middleware/auth';

const router = express.Router();

// Public routes
router.get('/', getAllTips);
router.get('/top', getTopTips);
router.get('/:id', getTipById);

// Protected routes
router.post('/', authenticateToken, createTip);
router.put('/:id', authenticateToken, updateTip);
router.delete('/:id', authenticateToken, deleteTip);
router.post('/:id/like', authenticateToken, likeTip);
router.post('/:id/comment', authenticateToken, addComment);

export default router;