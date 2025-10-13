import api from './api';
import type { DashboardStats, CommunityStats, LeaderboardUser } from '../types';

export const dashboardService = {
  // Get user stats
  getUserStats: async (): Promise<DashboardStats> => {
    const response = await api.get<DashboardStats>('/dashboard/stats');
    return response.data;
  },

  // Get community stats
  getCommunityStats: async (): Promise<CommunityStats> => {
    const response = await api.get<CommunityStats>('/dashboard/community');
    return response.data;
  },

  // Get leaderboard
  getLeaderboard: async (limit: number = 10): Promise<LeaderboardUser[]> => {
    const response = await api.get<{ leaderboard: LeaderboardUser[] }>(
      `/dashboard/leaderboard?limit=${limit}`
    );
    return response.data.leaderboard;
  },
};