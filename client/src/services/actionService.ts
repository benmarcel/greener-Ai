import type { Action, IGetAllActionsSuccess } from '../types';
import type { AxiosResponse } from 'axios';
import api from './api';

export const actionService = {
  // Create action
  createAction: async (data: {
    actionType: string;
    title: string;
    description: string;
    imageUrl?: string;
  }): Promise<Action> => {
    const response: AxiosResponse<Action> = await api.post('/actions', data);
    return response.data;
  },

  // Get all actions
  getAllActions: async (page: number = 1): Promise<IGetAllActionsSuccess> => {
    const response: AxiosResponse<IGetAllActionsSuccess> =
      await api.get('/actions', { params: { page } });
    return response.data;
  },

  // Get user actions
  getUserActions: async (userId: string): Promise<Action[]> => {
    const response: AxiosResponse<Action[]> = await api.get(`/users/${userId}/actions`);
    return response.data;
  },

  // Delete action
  deleteAction: async (id: string): Promise<void> => {
    await api.delete(`/actions/${id}`);
  },
};