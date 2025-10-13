// Import necessary modules from the mongoose library.
import mongoose, { Schema, Document } from 'mongoose';

// --- TypeScript Interface Definition ---

/**
 * Defines the structure and types for an individual user Action document.
 * Extends Mongoose's Document interface for database properties like _id.
 */
export interface IAction extends Document {
  // Links the action back to the User model via ObjectId
  userId: mongoose.Types.ObjectId; 
  // Restricted set of allowed action types (e.g., composting, planting)
  actionType: 'composting' | 'planting' | 'recycling' | 'water_saving'; 
  title: string;
  description: string;
  points: number;
  // Nested object for detailed environmental impact metrics
  impactMetric: {
    co2Saved: number;
    waterSaved: number;
    treesPlanted: number;
  };
  imageUrl?: string; // Optional URL for proof/image associated with the action
  date: Date; // Date the action was performed
  verified: boolean; // Flag indicating if the action has been verified by an admin/system
}

// --- Mongoose Schema Definition ---

// Define the schema (structure and validation rules) for the Action model.
const ActionSchema: Schema = new Schema({
  // Foreign Key Link to User
  userId: {
    type: Schema.Types.ObjectId, // Specifies the data type is a MongoDB ObjectId
    ref: 'User', // Establishes a reference to the 'User' model for population
    required: true // Must be linked to a user
  },
  // Type of action performed
  actionType: {
    type: String,
    // Restricts the field's value to one of the defined strings
    enum: ['composting', 'planting', 'recycling', 'water_saving'],
    required: [true, 'Action type is required']
  },
  // Short summary of the action
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  // Detailed description of the action
  description: {
    type: String,
    required: [true, 'Description is required'],
    maxlength: [500, 'Description cannot exceed 500 characters']
  },
  // Points awarded for the action
  points: {
    type: Number,
    required: true,
    min: 0,
    max: 100 // Ensures points are within a sensible range
  },
  // Nested object to track environmental impact
  impactMetric: {
    co2Saved: { type: Number, default: 0 },
    waterSaved: { type: Number, default: 0 },
    treesPlanted: { type: Number, default: 0 }
  },
  // Image or proof of action
  imageUrl: {
    type: String,
    default: '' // Default to empty string if no image provided
  },
  // Date the action was recorded
  date: {
    type: Date,
    default: Date.now
  },
  // Verification status
  verified: {
    type: Boolean,
    default: false // Actions are unverified by default
  }
}, {
  // Schema Option: Automatically adds 'createdAt' and 'updatedAt' fields
  timestamps: true
});

// --- Database Indexing for Performance ---

// Index 1: Composite index for finding a user's actions, ordered by newest first.
ActionSchema.index({ userId: 1, date: -1 });
// Index 2: Index for querying/filtering actions by their type.
ActionSchema.index({ actionType: 1 });

// --- Export Mongoose Model ---

// Compiles the schema into a reusable Model and exports it.
// The model is named 'Action', and it is strongly typed with the IAction interface.
export default mongoose.model<IAction>('Action', ActionSchema);