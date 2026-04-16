import api from './api';
import type { ApiResponse, Book, PaginationParams } from '@/types';

export const bookService = {
  getBooks: async (params?: PaginationParams & { 
    category?: string; 
    minPrice?: number; 
    maxPrice?: number;
    featured?: boolean;
  }): Promise<ApiResponse<Book[]>> => {
    const response = await api.get('/books', { params });
    return response.data;
  },

  getBook: async (slug: string): Promise<ApiResponse<Book>> => {
    const response = await api.get(`/books/${slug}`);
    return response.data;
  },

  createBook: async (data: FormData): Promise<ApiResponse<Book>> => {
    const response = await api.post('/books', data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },

  updateBook: async (id: string, data: FormData): Promise<ApiResponse<Book>> => {
    const response = await api.put(`/books/${id}`, data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },

  deleteBook: async (id: string): Promise<ApiResponse<void>> => {
    const response = await api.delete(`/books/${id}`);
    return response.data;
  },

  getFeaturedBooks: async (): Promise<ApiResponse<Book[]>> => {
    const response = await api.get('/books/featured/list');
    return response.data;
  },

  getRelatedBooks: async (slug: string): Promise<ApiResponse<Book[]>> => {
    const response = await api.get(`/books/${slug}/related`);
    return response.data;
  },
};
