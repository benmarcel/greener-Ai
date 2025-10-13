import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import Tip, { ITip } from '../models/Tips';
import User from '../models/User';

// Create new tip
export const createTip = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.userId;
    const { title, content, category, tags, isAIGenerated } = req.body;

    if (!userId) {
      res.status(401).json({ message: 'Authentication required' });
      return;
    }

    // Validation
    if (!title || !content || !category) {
      res.status(400).json({ message: 'Title, content, and category are required' });
      return;
    }

    const newTip = new Tip({
      authorId: userId,
      title,
      content,
      category,
      tags: tags || [],
      isAIGenerated: isAIGenerated || false,
    });

    await newTip.save();

    // Award points to user for sharing tip
    const user = await User.findById(userId);
    if (user) {
      user.points += 10;
      user.level = Math.floor(user.points / 100) + 1;
      await user.save();
    }

    res.status(201).json({
      message: 'Tip created successfully!',
      tip: newTip,
      pointsEarned: 10,
    });
  } catch (error: any) {
    console.error('Create tip error:', error);
    res.status(500).json({
      message: 'Error creating tip',
      error: error.message,
    });
  }
};

// Get all tips with pagination and filters
export const getAllTips = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const category = req.query.category as string;
    const skip = (page - 1) * limit;

    const filter: any = {};
    if (category) {
      filter.category = category;
    }

    const tips = await Tip.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate('authorId', 'name location level');

    const total = await Tip.countDocuments(filter);

    res.status(200).json({
      tips,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalTips: total,
      },
    });
  } catch (error: any) {
    console.error('Get tips error:', error);
    res.status(500).json({
      message: 'Error fetching tips',
      error: error.message,
    });
  }
};

// Get single tip
export const getTipById = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const tip = await Tip.findById(id)
      .populate('authorId', 'name location level badges')
      .populate('comments.userId', 'name');

    if (!tip) {
      res.status(404).json({ message: 'Tip not found' });
      return;
    }

    res.status(200).json({ tip });
  } catch (error: any) {
    console.error('Get tip error:', error);
    res.status(500).json({
      message: 'Error fetching tip',
      error: error.message,
    });
  }
};

// Update tip
export const updateTip = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.userId;
    const { id } = req.params;
    const { title, content, category, tags } = req.body;

    const tip = await Tip.findById(id);

    if (!tip) {
      res.status(404).json({ message: 'Tip not found' });
      return;
    }

    // Check ownership
    if (tip.authorId.toString() !== userId) {
      res.status(403).json({ message: 'You can only update your own tips' });
      return;
    }

    // Update fields
    if (title) tip.title = title;
    if (content) tip.content = content;
    if (category) tip.category = category;
    if (tags) tip.tags = tags;

    await tip.save();

    res.status(200).json({
      message: 'Tip updated successfully',
      tip,
    });
  } catch (error: any) {
    console.error('Update tip error:', error);
    res.status(500).json({
      message: 'Error updating tip',
      error: error.message,
    });
  }
};

// Delete tip
export const deleteTip = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.userId;
    const { id } = req.params;

    const tip = await Tip.findById(id);

    if (!tip) {
      res.status(404).json({ message: 'Tip not found' });
      return;
    }

    // Check ownership
    if (tip.authorId.toString() !== userId) {
      res.status(403).json({ message: 'You can only delete your own tips' });
      return;
    }

    await Tip.findByIdAndDelete(id);

    res.status(200).json({ message: 'Tip deleted successfully' });
  } catch (error: any) {
    console.error('Delete tip error:', error);
    res.status(500).json({
      message: 'Error deleting tip',
      error: error.message,
    });
  }
};

// Like/Unlike tip
export const likeTip = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.userId;
    const { id } = req.params;

    if (!userId) {
      res.status(401).json({ message: 'Authentication required' });
      return;
    }

    const tip = await Tip.findById(id);

    if (!tip) {
      res.status(404).json({ message: 'Tip not found' });
      return;
    }

    // Check if already liked
    const alreadyLiked = tip.likedBy.some((id) => id.toString() === userId);

    if (alreadyLiked) {
      // Unlike
      tip.likedBy = tip.likedBy.filter((id) => id.toString() !== userId);
      tip.likes = Math.max(0, tip.likes - 1);
    } else {
      // Like
      tip.likedBy.push(userId as any);
      tip.likes += 1;
    }

    await tip.save();

    res.status(200).json({
      message: alreadyLiked ? 'Tip unliked' : 'Tip liked',
      likes: tip.likes,
      isLiked: !alreadyLiked,
    });
  } catch (error: any) {
    console.error('Like tip error:', error);
    res.status(500).json({
      message: 'Error liking tip',
      error: error.message,
    });
  }
};

// Add comment to tip
export const addComment = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.userId;
    const { id } = req.params;
    const { text } = req.body;

    if (!userId) {
      res.status(401).json({ message: 'Authentication required' });
      return;
    }

    if (!text || text.trim().length === 0) {
      res.status(400).json({ message: 'Comment text is required' });
      return;
    }

    const tip = await Tip.findById(id);

    if (!tip) {
      res.status(404).json({ message: 'Tip not found' });
      return;
    }

    tip.comments.push({
      userId: userId as any,
      text: text.trim(),
      date: new Date(),
    });

    await tip.save();

    // Populate the new comment's user data
    await tip.populate('comments.userId', 'name');

    res.status(201).json({
      message: 'Comment added successfully',
      comment: tip.comments[tip.comments.length - 1],
    });
  } catch (error: any) {
    console.error('Add comment error:', error);
    res.status(500).json({
      message: 'Error adding comment',
      error: error.message,
    });
  }
};

// Get top tips (most liked)
export const getTopTips = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const limit = parseInt(req.query.limit as string) || 10;

    const tips = await Tip.find()
      .sort({ likes: -1 })
      .limit(limit)
      .populate('authorId', 'name location level');

    res.status(200).json({ tips });
  } catch (error: any) {
    console.error('Get top tips error:', error);
    res.status(500).json({
      message: 'Error fetching top tips',
      error: error.message,
    });
  }
};