import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { bookService } from '@/services';
import type { PaginationParams } from '@/types';

export const useBooks = (params?: PaginationParams & { 
  category?: string; 
  minPrice?: number; 
  maxPrice?: number;
  featured?: boolean;
}) => {
  return useQuery({
    queryKey: ['books', params],
    queryFn: () => bookService.getBooks(params),
  });
};

export const useBook = (slug: string) => {
  return useQuery({
    queryKey: ['book', slug],
    queryFn: () => bookService.getBook(slug),
    enabled: !!slug,
  });
};

export const useFeaturedBooks = () => {
  return useQuery({
    queryKey: ['featured-books'],
    queryFn: () => bookService.getFeaturedBooks(),
  });
};

export const useCreateBook = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: FormData) => bookService.createBook(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['books'] });
    },
  });
};

export const useUpdateBook = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: FormData }) => 
      bookService.updateBook(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['books'] });
    },
  });
};

export const useDeleteBook = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: string) => bookService.deleteBook(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['books'] });
    },
  });
};

export const useRelatedBooks = (slug: string) => {
  return useQuery({
    queryKey: ['related-books', slug],
    queryFn: () => bookService.getRelatedBooks(slug),
    enabled: !!slug,
  });
};
