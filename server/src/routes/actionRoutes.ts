import express from 'express';
import {
  createAction,
  getAllActions,
  getActionById,
  getUserActions,
  updateAction,
  deleteAction,
  getActionsByType,
} from '../controllers/actionController';
import { authenticateToken } from '../middleware/auth';

const router = express.Router();

// Public routes
router.get('/', getAllActions);
router.get('/:id', getActionById);
router.get('/user/:userId', getUserActions);
router.get('/type/:type', getActionsByType);

// Protected routes
router.post('/', authenticateToken, createAction);
router.put('/:id', authenticateToken, updateAction);
router.delete('/:id', authenticateToken, deleteAction);

export default router;