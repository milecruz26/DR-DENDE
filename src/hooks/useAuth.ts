import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { authService } from '../services/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useLogin = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: authService.login,
    onSuccess: async (data) => {
      await AsyncStorage.setItem('@token', data.data.access_token);
      queryClient.invalidateQueries({ queryKey: ['currentUser'] });
    },
  });
};

export const useCurrentUser = () => {
  return useQuery({
    queryKey: ['currentUser'],
    queryFn: () => authService.getCurrentUser().then(res => res.data),
    staleTime: 5 * 60 * 1000, // 5 minutos
  });
};