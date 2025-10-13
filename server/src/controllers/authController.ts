import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'; // prefer default or `import * as jwt from 'jsonwebtoken'`
import User, { IUser } from '../models/User';


// Register new user
export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password, location, climateZone } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ message: 'User already exists with this email' });
      return;
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser: IUser = new User({
      name,
      email,
      password: hashedPassword,
      location: location || '',
      climateZone: climateZone || 'temperate'
    });

    await newUser.save();

    // Generate JWT token
    if (!process.env.JWT_SECRET) throw new Error('Missing JWT_SECRET env var');

    const token = jwt.sign(
      { id: newUser.id },                    // payload
      process.env.JWT_SECRET as jwt.Secret, // secret (definite type)
      { expiresIn: '1h' }                 // options
    );

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        location: newUser.location,
        points: newUser.points,
        level: newUser.level
      }
    });
  } catch (error: any) {
    console.error('Registration error:', error);
    res.status(500).json({ 
      message: 'Error registering user',
      error: error.message 
    });
  }
};

// Login user
export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      res.status(401).json({ message: 'Invalid email or password' });
      return;
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(401).json({ message: 'Invalid email or password' });
      return;
    }

    // Update last active
    user.lastActive = new Date();
    await user.save();

    // Generate JWT token
    if (!process.env.JWT_SECRET) throw new Error('Missing JWT_SECRET env var');

    const token = jwt.sign(
      { id: user.id },                    // payload
      process.env.JWT_SECRET as jwt.Secret, // secret (definite type)
      { expiresIn: '2h' }                 // options
    );

    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        location: user.location,
        climateZone: user.climateZone,
        points: user.points,
        level: user.level,
        badges: user.badges
      }
    });
  } catch (error: any) {
    console.error('Login error:', error);
    res.status(500).json({ 
      message: 'Error logging in',
      error: error.message 
    });
  }
};

// Get user profile
export const getProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).userId;
    console.log(userId);
    

    const user = await User.findById(userId).select('-password');
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    res.status(200).json({ user });
  } catch (error: any) {
    console.error('Get profile error:', error);
    res.status(500).json({ 
      message: 'Error fetching profile',
      error: error.message 
    });
  }
};

// Update user profile
export const updateProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).userId;
    const { name, location, climateZone } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    // Update fields
    if (name) user.name = name;
    if (location) user.location = location;
    if (climateZone) user.climateZone = climateZone;

    await user.save();

    res.status(200).json({
      message: 'Profile updated successfully',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        location: user.location,
        climateZone: user.climateZone,
        points: user.points,
        level: user.level
      }
    });
  } catch (error: any) {
    console.error('Update profile error:', error);
    res.status(500).json({ 
      message: 'Error updating profile',
      error: error.message 
    });
  }
};