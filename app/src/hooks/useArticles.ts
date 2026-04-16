import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { articleService } from '@/services';
import type { PaginationParams } from '@/types';

export const useArticles = (params?: PaginationParams & { category?: string; tag?: string }) => {
  return useQuery({
    queryKey: ['articles', params],
    queryFn: () => articleService.getArticles(params),
  });
};

export const useArticle = (slug: string) => {
  return useQuery({
    queryKey: ['article', slug],
    queryFn: () => articleService.getArticle(slug),
    enabled: !!slug,
  });
};

export const useCreateArticle = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: FormData) => articleService.createArticle(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['articles'] });
    },
  });
};

export const useUpdateArticle = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: FormData }) => 
      articleService.updateArticle(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['articles'] });
      queryClient.invalidateQueries({ queryKey: ['article', variables.id] });
    },
  });
};

export const useDeleteArticle = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: string) => articleService.deleteArticle(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['articles'] });
    },
  });
};

export const useRelatedArticles = (slug: string) => {
  return useQuery({
    queryKey: ['related-articles', slug],
    queryFn: () => articleService.getRelatedArticles(slug),
    enabled: !!slug,
  });
};
