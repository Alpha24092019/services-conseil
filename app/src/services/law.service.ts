import api from './api';
import type { ApiResponse, Law, PaginationParams } from '@/types';

export const lawService = {
  getLaws: async (params?: PaginationParams & { category?: string; year?: number }): Promise<ApiResponse<Law[]>> => {
    const response = await api.get('/laws', { params });
    return response.data;
  },

  getLaw: async (slug: string): Promise<ApiResponse<Law>> => {
    const response = await api.get(`/laws/${slug}`);
    return response.data;
  },

  createLaw: async (data: FormData): Promise<ApiResponse<Law>> => {
    const response = await api.post('/laws', data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },

  updateLaw: async (id: string, data: FormData): Promise<ApiResponse<Law>> => {
    const response = await api.put(`/laws/${id}`, data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },

  deleteLaw: async (id: string): Promise<ApiResponse<void>> => {
    const response = await api.delete(`/laws/${id}`);
    return response.data;
  },

  downloadLaw: async (id: string): Promise<Blob> => {
    const response = await api.get(`/laws/${id}/download`, {
      responseType: 'blob',
    });
    return response.data;
  },

  getLawYears: async (): Promise<ApiResponse<number[]>> => {
    const response = await api.get('/laws/years');
    return response.data;
  },
};
