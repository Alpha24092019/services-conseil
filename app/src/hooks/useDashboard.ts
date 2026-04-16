import { useQuery } from '@tanstack/react-query';
import { dashboardService } from '@/services';

export const useDashboardStats = () => {
  return useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: () => dashboardService.getDashboardStats(),
  });
};

export const useRecentActivity = () => {
  return useQuery({
    queryKey: ['recent-activity'],
    queryFn: () => dashboardService.getRecentActivity(),
  });
};
