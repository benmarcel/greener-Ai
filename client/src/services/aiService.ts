import api from './api';
import type { Recommendation } from '../types';
export const aiService = {
  // Chat with AI
  chat: async (question: string): Promise<string> => {
    const response = await api.post<{ answer: string }>('/ai/chat', { question });
    return response.data.answer;
  },

  // Get personalized recommendations
  getRecommendations: async (): Promise<Recommendation[]> => {
    const response = await api.post<{ recommendations: Recommendation[] }>('/ai/recommendations');
    return response.data.recommendations;
  },
};