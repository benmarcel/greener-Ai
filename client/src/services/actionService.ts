import api from './api';
import type { Action } from '../types';

export const actionService = {
  // Create action
  createAction: async (data: {
    actionType: string;
    title: string;
    description: string;
    imageUrl?: string;
  }): Promise<Action> => {
    const response = await api.post('/actions', data);
    return response.data;
  },

  // Get all actions
  getAllActions: async (page: number = 1): Promise<any> => {
    const response = await api.get(`/actions?page=${page}`);
    return response.data;
  },

  // Get user actions
  getUserActions: async (userId: string): Promise<Action[]> => {
    const response = await api.get<{ actions: Action[] }>(`/actions/user/${userId}`);
    return response.data.actions;
  },

  // Delete action
  deleteAction: async (id: string): Promise<void> => {
    await api.delete(`/actions/${id}`);
  },
};