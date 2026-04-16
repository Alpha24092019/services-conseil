import api from './api';
import type { ApiResponse, Order, CreateOrderData, PaginationParams } from '@/types';

export const orderService = {
  createOrder: async (data: CreateOrderData): Promise<ApiResponse<Order>> => {
    const response = await api.post('/orders', data);
    return response.data;
  },

  getOrders: async (params?: PaginationParams & { status?: string }): Promise<ApiResponse<Order[]>> => {
    const response = await api.get('/orders', { params });
    return response.data;
  },

  getOrder: async (id: string): Promise<ApiResponse<Order>> => {
    const response = await api.get(`/orders/${id}`);
    return response.data;
  },

  updateOrderStatus: async (id: string, status: Order['status']): Promise<ApiResponse<Order>> => {
    const response = await api.put(`/orders/${id}/status`, { status });
    return response.data;
  },

  deleteOrder: async (id: string): Promise<ApiResponse<void>> => {
    const response = await api.delete(`/orders/${id}`);
    return response.data;
  },

  trackOrder: async (orderNumber: string): Promise<ApiResponse<Order>> => {
    const response = await api.get(`/orders/track/${orderNumber}`);
    return response.data;
  },

  getOrderStats: async (): Promise<ApiResponse<{
    totalOrders: number;
    pendingOrders: number;
    deliveredOrders: number;
    cancelledOrders: number;
    todayOrders: number;
    totalRevenue: number;
  }>> => {
    const response = await api.get('/orders/stats/overview');
    return response.data;
  },
};
