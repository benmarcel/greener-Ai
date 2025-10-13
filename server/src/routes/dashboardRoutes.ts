import express from 'express';
import {
  getUserStats,
  getCommunityStats,
  getLeaderboard,
} from '../controllers/dashboardController';
import { authenticateToken } from '../middleware/auth';

const router = express.Router();

// Protected route
router.get('/stats', authenticateToken, getUserStats);

// Public routes
router.get('/community', getCommunityStats);
router.get('/leaderboard', getLeaderboard);

export default router;