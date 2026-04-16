import api from './api';
import type { ApiResponse, Article, PaginationParams } from '@/types';

export const articleService = {
  getArticles: async (params?: PaginationParams & { category?: string; tag?: string }): Promise<ApiResponse<Article[]>> => {
    const response = await api.get('/articles', { params });
    return response.data;
  },

  getArticle: async (slug: string): Promise<ApiResponse<Article>> => {
    const response = await api.get(`/articles/${slug}`);
    return response.data;
  },

  createArticle: async (data: FormData): Promise<ApiResponse<Article>> => {
    const response = await api.post('/articles', data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },

  updateArticle: async (id: string, data: FormData): Promise<ApiResponse<Article>> => {
    const response = await api.put(`/articles/${id}`, data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },

  deleteArticle: async (id: string): Promise<ApiResponse<void>> => {
    const response = await api.delete(`/articles/${id}`);
    return response.data;
  },

  getRelatedArticles: async (slug: string): Promise<ApiResponse<Article[]>> => {
    const response = await api.get(`/articles/${slug}/related`);
    return response.data;
  },

  likeArticle: async (id: string): Promise<ApiResponse<string[]>> => {
    const response = await api.post(`/articles/${id}/like`);
    return response.data;
  },
};
