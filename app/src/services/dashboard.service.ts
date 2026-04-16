import api from './api';
import type { ApiResponse, DashboardStats } from '@/types';

interface Activity {
  type: 'order' | 'article' | 'user';
  title: string;
  description: string;
  status: string;
  date: string;
}

export const dashboardService = {
  getDashboardStats: async (): Promise<ApiResponse<DashboardStats>> => {
    const response = await api.get('/dashboard/stats');
    return response.data;
  },

  getRecentActivity: async (): Promise<ApiResponse<Activity[]>> => {
    const response = await api.get('/dashboard/activity');
    return response.data;
  },
};
