import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import User from '../models/User';
import Action from '../models/Action';
import Tip from '../models/Tips';

// Get user stats
export const getUserStats = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.userId;

    if (!userId) {
      res.status(401).json({ message: 'Authentication required' });
      return;
    }

    const user = await User.findById(userId).select('-password');
    const totalActions = await Action.countDocuments({ userId });
    const totalTips = await Tip.countDocuments({ authorId: userId });

    // Calculate user's total impact
    const userActions = await Action.find({ userId });
    const totalImpact = userActions.reduce(
      (acc, action) => {
        acc.co2Saved += action.impactMetric.co2Saved;
        acc.waterSaved += action.impactMetric.waterSaved;
        acc.treesPlanted += action.impactMetric.treesPlanted;
        return acc;
      },
      { co2Saved: 0, waterSaved: 0, treesPlanted: 0 }
    );

    // Get recent actions
    const recentActions = await Action.find({ userId })
      .sort({ date: -1 })
      .limit(5);

    res.status(200).json({
      user,
      stats: {
        totalPoints: user?.points || 0,
        level: user?.level || 1,
        totalActions,
        totalTips,
        totalImpact,
      },
      recentActions,
    });
  } catch (error: any) {
    console.error('Get user stats error:', error);
    res.status(500).json({
      message: 'Error fetching user stats',
      error: error.message,
    });
  }
};

// Get community stats
export const getCommunityStats = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const totalUsers = await User.countDocuments();
    const totalActions = await Action.countDocuments();
    const totalTips = await Tip.countDocuments();

    // Calculate community impact
    const allActions = await Action.find();
    const communityImpact = allActions.reduce(
      (acc, action) => {
        acc.co2Saved += action.impactMetric.co2Saved;
        acc.waterSaved += action.impactMetric.waterSaved;
        acc.treesPlanted += action.impactMetric.treesPlanted;
        return acc;
      },
      { co2Saved: 0, waterSaved: 0, treesPlanted: 0 }
    );

    res.status(200).json({
      totalUsers,
      totalActions,
      totalTips,
      communityImpact,
    });
  } catch (error: any) {
    console.error('Get community stats error:', error);
    res.status(500).json({
      message: 'Error fetching community stats',
      error: error.message,
    });
  }
};

// Get leaderboard
export const getLeaderboard = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const limit = parseInt(req.query.limit as string) || 10;

    const topUsers = await User.find()
      .select('name location points level badges')
      .sort({ points: -1 })
      .limit(limit);

    res.status(200).json({ leaderboard: topUsers });
  } catch (error: any) {
    console.error('Get leaderboard error:', error);
    res.status(500).json({
      message: 'Error fetching leaderboard',
      error: error.message,
    });
  }
};