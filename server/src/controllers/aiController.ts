// --- FILE IMPORTS ---
import { Response } from 'express';
// AuthRequest is an extended Request type that includes the 'userId' property, 
// typically added by JWT authentication middleware.
import { AuthRequest } from '../middleware/auth'; 
// Function to get the configured Gemini Generative Model instance (e.g., gemini-2.5-flash).
import { getGeminiModel } from '../config/gemini';
// Mongoose Model for User data, used to fetch personalized context.
import User from '../models/User';

// --- AI CONTROLLER FUNCTIONS ---

// AI Chatbot: Handles user questions and returns a personalized AI response.
export const chatWithAI = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    // Destructure the user's question from the request body.
    const { question } = req.body;
    // Get the authenticated user's ID from the request object (set by middleware).
    const userId = req.userId;

    // --- Input Validation ---
    if (!question || question.trim().length === 0) {
      // Respond with a 400 status if the question is missing or empty.
      res.status(400).json({ message: 'Question is required' });
      return;
    }

    // --- Context Gathering: Fetch User Profile Data ---
    let userContext = '';
    if (userId) {
      // Find the user document in the database using the authenticated ID.
      const user = await User.findById(userId);
      if (user) {
        // Build a string containing relevant user data for the AI prompt.
        userContext = `
User Context:
- Location: ${user.location || 'Not specified'} // Use saved location or default
- Climate Zone: ${user.climateZone}
// Determines a general skill level based on the user's numeric 'level'
- Experience Level: ${user.level > 5 ? 'Advanced' : user.level > 2 ? 'Intermediate' : 'Beginner'}
        `;
      }
    }

    // Get the pre-configured Gemini model instance.
    const model = getGeminiModel();

    // --- AI System Prompt Construction (Defines Persona and Rules) ---
    const prompt = `You are GreenThumb AI, an expert sustainability and gardening assistant.
// Defines the AI's core responsibilities and expertise.
Your role is to help users with:
- Sustainable farming and gardening practices
- Composting and soil health
// ... (rest of the expertise list) ...

// Instructions for the AI's response style and format.
Guidelines:
- Give practical, actionable advice
// Crucial for context: instruct AI to use the profile data.
- Consider the user's location and climate
- Promote organic and sustainable methods
- Be encouraging and supportive
- Keep responses concise (2-3 paragraphs max)
// Specific domain focus for relevance.
- Focus on solutions for African climate where applicable

${userContext} // Injects the personalized user data

User Question: ${question} // The user's specific query

Please provide a helpful, practical response:`;

    // --- AI Execution ---
    const result = await model.generateContent(prompt); // Sends the prompt to the Gemini API
    const response = await result.response;
    const answer = response.text(); // Extracts the clean text response

    // --- Success Response ---
    res.status(200).json({
      answer,
      timestamp: new Date() // Adds a timestamp for the client
    });
  } catch (error: any) {
    console.error('AI Chat error:', error);
    
    // --- Detailed Error Handling ---
    // Handles specific API errors from the Gemini service for better user feedback.
    if (error.message?.includes('quota')) {
      // HTTP 429 Too Many Requests: Indicates rate limiting or quota exhaustion.
      res.status(429).json({ 
        message: "I'm experiencing high demand. Please try again in a moment." 
      });
    } else if (error.message?.includes('safety')) {
      // HTTP 400 Bad Request: Indicates the prompt or response was blocked by safety filters.
      res.status(400).json({ 
        message: 'I cannot provide a response to that question. Please rephrase.' 
      });
    } else {
      // HTTP 500 Internal Server Error: General fallback for unexpected issues.
      res.status(500).json({ 
        message: "I'm having trouble right now. Please try again later.",
        error: error.message 
      });
    }
  }
};




// Get personalized recommendations: Generates structured, actionable tasks tailored to the user.
export const getRecommendations = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.userId; // Get user ID from the middleware

    // --- Authentication Check ---
    if (!userId) {
      res.status(401).json({ message: 'Authentication required' });
      return;
    }

    // --- User Existence Check ---
    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    const model = getGeminiModel();

    // --- Strict JSON Prompt Construction ---
    const prompt = `You are Greener AI. Generate 3 personalized weekly sustainability actions for this user:

// Inject detailed user profile data.
User Profile:
- Location: ${user.location || 'Not specified'}
- Climate Zone: ${user.climateZone}
- Current Level: ${user.level}
- Current Points: ${user.points}

// Defines the number of items and the required structure for each item.
Generate 3 specific, actionable tasks they can do this week. For each task, provide:
1. A clear title (max 10 words)
2. Brief description (2-3 sentences)
3. Difficulty level (Beginner/Intermediate/Advanced)
4. Estimated impact (Low/Medium/High)
5. Points they'll earn (10-50 points)

// Specifies the exact desired JSON output format.
Format as JSON array with this structure:
[
  {
    "title": "...",
    "description": "...",
    "difficulty": "...",
    "impact": "...",
    "points": 20
  }
]

// Critical instruction: forces the model to only output the JSON data.
Respond ONLY with valid JSON, no other text.`;

    // --- AI Execution ---
    const result = await model.generateContent(prompt);
    const response =  result.response;
    const text = response.text(); // Raw response text (expected to be JSON)

    // --- JSON Extraction and Parsing ---
    // Regex to find and extract the JSON array structure ([...]) from the raw AI text.
    const jsonMatch = text.match(/\[[\s\S]*\]/);
    if (jsonMatch) {
      // Parse the extracted clean JSON string into a JavaScript object.
      const recommendations = JSON.parse(jsonMatch[0]);
      res.status(200).json({ recommendations }); // Send the structured data to the client.
    } else {
      // Throw error if the AI response cannot be parsed into the required JSON structure.
      throw new Error('Failed to parse AI response');
    }
  } catch (error: any) {
    console.error('Recommendations error:', error);
    // General error handling for the recommendation endpoint.
    res.status(500).json({ 
      message: 'Error generating recommendations',
      error: error.message 
    });
  }
};

