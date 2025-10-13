import api from './api';
import type { AuthResponse, User, newUser } from '../types';

export const authService = {
  // Register new user
  register: async (data: newUser): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/register', data);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  },

  // Login user
  login: async (email: string, password: string): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/login', { email, password });
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  },

  // Logout user
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  // Get current user
  getCurrentUser: (): User | null => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },

  // Check if user is authenticated
  isAuthenticated: (): boolean => {
    return !!localStorage.getItem('token');
  },

  // Get profile
  getProfile: async (): Promise<User> => {
    const response = await api.get<{ user: User }>('/auth/profile');
    localStorage.setItem('user', JSON.stringify(response.data.user));
    return response.data.user;
  },

  // Update profile
  updateProfile: async (data: {
    name?: string;
    location?: string;
    climateZone?: string;
  }): Promise<User> => {
    const response = await api.put<{ user: User }>('/auth/profile', data);
    localStorage.setItem('user', JSON.stringify(response.data.user));
    return response.data.user;
  },
};