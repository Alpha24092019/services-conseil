import api from './api';
import type { ApiResponse, Category } from '@/types';

export const categoryService = {
  getCategories: async (type?: string): Promise<ApiResponse<Category[]>> => {
    const response = await api.get('/categories', { params: { type } });
    return response.data;
  },

  getCategory: async (slug: string): Promise<ApiResponse<Category>> => {
    const response = await api.get(`/categories/${slug}`);
    return response.data;
  },

  createCategory: async (data: Partial<Category>): Promise<ApiResponse<Category>> => {
    const response = await api.post('/categories', data);
    return response.data;
  },

  updateCategory: async (id: string, data: Partial<Category>): Promise<ApiResponse<Category>> => {
    const response = await api.put(`/categories/${id}`, data);
    return response.data;
  },

  deleteCategory: async (id: string): Promise<ApiResponse<void>> => {
    const response = await api.delete(`/categories/${id}`);
    return response.data;
  },

  getCategoriesByType: async (type: string): Promise<ApiResponse<Category[]>> => {
    const response = await api.get(`/categories/type/${type}`);
    return response.data;
  },
};
