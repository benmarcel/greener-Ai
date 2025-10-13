// Import necessary modules from the mongoose library.
import mongoose, { Schema, Document } from 'mongoose';

// --- TypeScript Interface Definition ---

/**
 * Defines the structure and types for a User document.
 * Extends Mongoose's Document interface to include Mongoose's own properties (_id, __v, etc.).
 */
export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  location: string;
  climateZone: string;
  points: number;
  level: number;
  badges: string[]; // Array of strings to store earned badges
  joinedDate: Date; // Timestamp of when the user joined
  lastActive: Date; // Timestamp of the user's last activity
}

// --- Mongoose Schema Definition ---

// Define the schema (structure and validation rules) for the User model.
const UserSchema: Schema = new Schema({
  // User's display name configuration
  name: {
    type: String,
    required: [true, 'Name is required'], // Name is mandatory
    trim: true, // Removes leading/trailing whitespace
    minlength: [2, 'Name must be at least 2 characters'] // Minimum length constraint
  },
  // User's email configuration
  email: {
    type: String,
    required: [true, 'Email is required'], // Email is mandatory
    unique: true, // Ensures no two users can share the same email address
    lowercase: true, // Converts email to lowercase before saving for consistency
    trim: true, // Removes leading/trailing whitespace
    // Uses a Regular Expression to validate the email format
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  // User's password configuration
  password: {
    type: String,
    required: [true, 'Password is required'], // Password is mandatory
    minlength: [6, 'Password must be at least 6 characters'] // Minimum length constraint
    // NOTE: Password hashing should be performed before saving to the database.
  },
  // User's location (optional)
  location: {
    type: String,
    default: '' // Default to an empty string if not provided
  },
  // User's environmental information
  climateZone: {
    type: String,
    // Restricts the value to one of the options in the array
    enum: ['tropical', 'subtropical', 'temperate', 'continental', 'polar'],
    default: 'temperate' // Default climate zone
  },
  // Gamification: User's accumulated points
  points: {
    type: Number,
    default: 0, // Starts at zero
    min: 0 // Cannot be negative
  },
  // Gamification: User's level
  level: {
    type: Number,
    default: 1, // Starts at level 1
    min: 1 // Minimum level
  },
  // Gamification: Array of earned badges
  badges: [{
    type: String
  }],
  // User timeline tracking
  joinedDate: {
    type: Date,
    default: Date.now // Set creation date automatically
  },
  lastActive: {
    type: Date,
    default: Date.now // Set last active date automatically
  }
}, {
  // Schema Options: Automatically add 'createdAt' and 'updatedAt' fields
  timestamps: true
});

// --- Database Indexing for Performance ---

// Create an index on points for fast sorting in descending order (e.g., for a leaderboard).
UserSchema.index({ points: -1 });

// --- Export Mongoose Model ---

// Compiles the schema into a reusable Model and exports it.
// The model is named 'User', and it is strongly typed with the IUser interface.
export default mongoose.model<IUser>('User', UserSchema);