import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { lawService } from '@/services';
import type { PaginationParams } from '@/types';

export const useLaws = (params?: PaginationParams & { category?: string; year?: number }) => {
  return useQuery({
    queryKey: ['laws', params],
    queryFn: () => lawService.getLaws(params),
  });
};

export const useLaw = (slug: string) => {
  return useQuery({
    queryKey: ['law', slug],
    queryFn: () => lawService.getLaw(slug),
    enabled: !!slug,
  });
};

export const useCreateLaw = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: FormData) => lawService.createLaw(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['laws'] });
    },
  });
};

export const useUpdateLaw = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: FormData }) => 
      lawService.updateLaw(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['laws'] });
    },
  });
};

export const useDeleteLaw = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: string) => lawService.deleteLaw(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['laws'] });
    },
  });
};

export const useLawYears = () => {
  return useQuery({
    queryKey: ['law-years'],
    queryFn: () => lawService.getLawYears(),
  });
};
