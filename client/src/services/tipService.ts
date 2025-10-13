import api from './api';
import type { Tip } from '../types';

export const tipService = {
  // Create tip
  createTip: async (data: {
    title: string;
    content: string;
    category: string;
    tags: string[];
  }): Promise<Tip> => {
    const response = await api.post<{ tip: Tip }>('/tips', data);
    return response.data.tip;
  },

  // Get all tips
  getAllTips: async (page: number = 1, category?: string): Promise<any> => {
    const url = category ? `/tips?page=${page}&category=${category}` : `/tips?page=${page}`;
    const response = await api.get(url);
    return response.data;
  },

  // Get top tips
  getTopTips: async (limit: number = 10): Promise<Tip[]> => {
    const response = await api.get<{ tips: Tip[] }>(`/tips/top?limit=${limit}`);
    return response.data.tips;
  },

  // Like tip
  likeTip: async (id: string): Promise<any> => {
    const response = await api.post(`/tips/${id}/like`);
    return response.data;
  },

  // Add comment
  addComment: async (id: string, text: string): Promise<any> => {
    const response = await api.post(`/tips/${id}/comment`, { text });
    return response.data;
  },
};