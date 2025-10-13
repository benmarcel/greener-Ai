import express from 'express';
import { chatWithAI, getRecommendations } from '../controllers/aiController';
import { authenticateToken } from '../middleware/auth';

const router = express.Router();

// AI routes (some can be public, some protected)
router.post('/chat', chatWithAI); // Can work with or without auth
router.post('/recommendations', authenticateToken, getRecommendations); // Requires auth

export default router;