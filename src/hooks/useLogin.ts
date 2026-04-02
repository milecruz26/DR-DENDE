import { useMutation, useQueryClient } from '@tanstack/react-query';
import { STORAGE_KEYS } from '@/constants/storageKeys';
import type { User } from '@/interfaces';
import { mapEstablishmentToUser } from '@/mappers/establishmentToUser';
import { authService, type UserInfo } from '@/services/auth';
import { userService } from '@/services/user';
import { storage } from '@/utils/storage';

export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ email, password }: { email: string; password: string }) => {
      const loginResponse = await authService.login({
        username: email,
        password,
        grant_type: 'password',
        scope: '',
        client_id: '',
        client_secret: '',
      });
      const { access_token, user_info } = loginResponse.data;

      await storage.setItem(STORAGE_KEYS.TOKEN, access_token);
      await storage.setItem(STORAGE_KEYS.USER_TYPE, user_info.user_type);

      const user = await fetchUserByType(user_info);

      if (user_info.user_type === 'staff') {
        await storage.setItem(STORAGE_KEYS.STAFF_USER, JSON.stringify(user));
      }

      return user;
    },
    onSuccess: (user) => {
      queryClient.setQueryData(['currentUser'], user);
    },
  });
};

async function fetchUserByType(userInfo: UserInfo): Promise<User> {
  switch (userInfo.user_type) {
    case 'common': {
      const { data } = await userService.getCurrentUser();
      return data;
    }
    case 'establishment': {
      const { data } = await userService.getCurrentEstablishment();
      return mapEstablishmentToUser(data);
    }
    case 'staff':
      return {
        id: userInfo.profile_id,
        username: userInfo.username,
        email: '',
        user_type: 'staff',
        address: null,
        role: userInfo.role,
      };
  }
}
