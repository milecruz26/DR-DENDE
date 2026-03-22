// hooks/useCurrentUser.ts
import { userService } from '@/services/user';
import { useQuery } from '@tanstack/react-query';
import * as SecureStore from 'expo-secure-store';

const TOKEN_KEY = 'auth_token';

export const useCurrentUser = () => {
  return useQuery({
    queryKey: ['currentUser'],
    queryFn: async () => {
      const token = await SecureStore.getItemAsync(TOKEN_KEY);
      if (!token) throw new Error('No token');
      const { data } = await userService.getCurrentUser();
      return data;
    },
    retry: false,
    staleTime: 5 * 60 * 1000, // 5 minutos
  });
};