import { useAuthStore } from '@/stores';

export const useAuth = () => {
  const { user, isAuthenticated, isLoading, error, login, register, logout, clearError } = useAuthStore();

  return {
    user,
    isAuthenticated,
    isLoading,
    error,
    login,
    register,
    logout,
    clearError,
    isAdmin: user?.role === 'admin' || user?.role === 'moderator',
  };
};
