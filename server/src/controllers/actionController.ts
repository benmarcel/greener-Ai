import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import Action, { IAction } from '../models/Action';
import User from '../models/User';

// Calculate points based on action type
const calculatePoints = (actionType: string): number => {
  const pointsMap: { [key: string]: number } = {
    planting: 50,
    composting: 30,
    recycling: 20,
    water_saving: 25,
  };
  return pointsMap[actionType] || 10;
};

// Calculate impact metrics based on action type
const calculateImpact = (actionType: string) => {
  const impactMap: { [key: string]: any } = {
    planting: { co2Saved: 5, waterSaved: 0, treesPlanted: 1 },
    composting: { co2Saved: 3, waterSaved: 10, treesPlanted: 0 },
    recycling: { co2Saved: 2, waterSaved: 5, treesPlanted: 0 },
    water_saving: { co2Saved: 1, waterSaved: 50, treesPlanted: 0 },
  };
  return impactMap[actionType] || { co2Saved: 1, waterSaved: 0, treesPlanted: 0 };
};

// Create new action
export const createAction = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.userId;
    const { actionType, title, description, imageUrl } = req.body;

    if (!userId) {
      res.status(401).json({ message: 'Authentication required' });
      return;
    }

    // Validation
    if (!actionType || !title || !description) {
      res.status(400).json({ message: 'Action type, title, and description are required' });
      return;
    }

    // Calculate points and impact
    const points = calculatePoints(actionType);
    const impactMetric = calculateImpact(actionType);

    // Create action
    const newAction = new Action({
      userId,
      actionType,
      title,
      description,
      points,
      impactMetric,
      imageUrl: imageUrl || '',
      date: new Date(),
      verified: false,
    });

    await newAction.save();

    // Update user points
    const user = await User.findById(userId);
    if (user) {
      user.points += points;
      // Calculate level (every 100 points = 1 level)
      user.level = Math.floor(user.points / 100) + 1;
      await user.save();
    }

    res.status(201).json({
      message: 'Action logged successfully!',
      action: newAction,
      pointsEarned: points,
      totalPoints: user?.points || 0,
      currentLevel: user?.level || 1,
    });
  } catch (error: any) {
    console.error('Create action error:', error);
    res.status(500).json({
      message: 'Error logging action',
      error: error.message,
    });
  }
};

// Get all actions with pagination
export const getAllActions = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const skip = (page - 1) * limit;

    const actions = await Action.find()
      .sort({ date: -1 })
      .skip(skip)
      .limit(limit)
      .populate('userId', 'name location');

    const total = await Action.countDocuments();

    res.status(200).json({
      actions,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalActions: total,
        hasMore: skip + actions.length < total,
      },
    });
  } catch (error: any) {
    console.error('Get actions error:', error);
    res.status(500).json({
      message: 'Error fetching actions',
      error: error.message,
    });
  }
};

// Get single action by ID
export const getActionById = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const action = await Action.findById(id).populate('userId', 'name location level');

    if (!action) {
      res.status(404).json({ message: 'Action not found' });
      return;
    }

    res.status(200).json({ action });
  } catch (error: any) {
    console.error('Get action error:', error);
    res.status(500).json({
      message: 'Error fetching action',
      error: error.message,
    });
  }
};

// Get user's actions
export const getUserActions = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { userId } = req.params;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const skip = (page - 1) * limit;

    const actions = await Action.find({ userId })
      .sort({ date: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Action.countDocuments({ userId });

    res.status(200).json({
      actions,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalActions: total,
      },
    });
  } catch (error: any) {
    console.error('Get user actions error:', error);
    res.status(500).json({
      message: 'Error fetching user actions',
      error: error.message,
    });
  }
};

// Update action
export const updateAction = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.userId;
    const { id } = req.params;
    const { title, description, imageUrl } = req.body;

    const action = await Action.findById(id);

    if (!action) {
      res.status(404).json({ message: 'Action not found' });
      return;
    }

    // Check if user owns this action
    if (action.userId.toString() !== userId) {
      res.status(403).json({ message: 'You can only update your own actions' });
      return;
    }

    // Update fields
    if (title) action.title = title;
    if (description) action.description = description;
    if (imageUrl !== undefined) action.imageUrl = imageUrl;

    await action.save();

    res.status(200).json({
      message: 'Action updated successfully',
      action,
    });
  } catch (error: any) {
    console.error('Update action error:', error);
    res.status(500).json({
      message: 'Error updating action',
      error: error.message,
    });
  }
};

// Delete action
export const deleteAction = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.userId;
    const { id } = req.params;

    const action = await Action.findById(id);

    if (!action) {
      res.status(404).json({ message: 'Action not found' });
      return;
    }

    // Check if user owns this action
    if (action.userId.toString() !== userId) {
      res.status(403).json({ message: 'You can only delete your own actions' });
      return;
    }

    // Remove points from user
    const user = await User.findById(userId);
    if (user) {
      user.points = Math.max(0, user.points - action.points);
      user.level = Math.floor(user.points / 100) + 1;
      await user.save();
    }

    await Action.findByIdAndDelete(id);

    res.status(200).json({
      message: 'Action deleted successfully',
      pointsDeducted: action.points,
    });
  } catch (error: any) {
    console.error('Delete action error:', error);
    res.status(500).json({
      message: 'Error deleting action',
      error: error.message,
    });
  }
};

// Get actions by type
export const getActionsByType = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { type } = req.params;

    const actions = await Action.find({ actionType: type })
      .sort({ date: -1 })
      .limit(20)
      .populate('userId', 'name location');

    res.status(200).json({ actions, count: actions.length });
  } catch (error: any) {
    console.error('Get actions by type error:', error);
    res.status(500).json({
      message: 'Error fetching actions',
      error: error.message,
    });
  }
};