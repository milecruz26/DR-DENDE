// hooks/useLogin.ts
import { authService } from '@/services/auth';
import { userService } from '@/services/user';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import * as SecureStore from 'expo-secure-store';

const TOKEN_KEY = 'auth_token';

export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ email, password }: { email: string; password: string }) => {
      // 1. Login
      const loginResponse = await authService.login({
        username: email,
        password,
        grant_type: 'password',
        scope: '',
        client_id: '',
        client_secret: '',
      });
      const { access_token } = loginResponse.data;

      // 2. Armazenar token
      await SecureStore.setItemAsync(TOKEN_KEY, access_token);

      // 3. Buscar dados do usuário
      const userResponse = await userService.getCurrentUser();
      return userResponse.data;
    },
    onSuccess: (user) => {
      // Armazenar no cache do Query como "currentUser"
      queryClient.setQueryData(['currentUser'], user);
      // Opcional: invalidar outras queries que dependam do usuário
    },
  });
};