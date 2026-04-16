import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { orderService } from '@/services';
import type { CreateOrderData, PaginationParams } from '@/types';

export const useOrders = (params?: PaginationParams & { status?: string }) => {
  return useQuery({
    queryKey: ['orders', params],
    queryFn: () => orderService.getOrders(params),
  });
};

export const useOrder = (id: string) => {
  return useQuery({
    queryKey: ['order', id],
    queryFn: () => orderService.getOrder(id),
    enabled: !!id,
  });
};

export const useCreateOrder = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: CreateOrderData) => orderService.createOrder(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
  });
};

export const useUpdateOrderStatus = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) => 
      orderService.updateOrderStatus(id, status as any),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
  });
};

export const useDeleteOrder = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: string) => orderService.deleteOrder(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
  });
};

export const useTrackOrder = (orderNumber: string) => {
  return useQuery({
    queryKey: ['track-order', orderNumber],
    queryFn: () => orderService.trackOrder(orderNumber),
    enabled: !!orderNumber,
  });
};

export const useOrderStats = () => {
  return useQuery({
    queryKey: ['order-stats'],
    queryFn: () => orderService.getOrderStats(),
  });
};
