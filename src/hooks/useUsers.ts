import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { UserCreate } from '@/interfaces/user';
import { userService } from '../services/user';
import { useInvalidateQueries } from './useInvalidateQueries';

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  const invalidate = useInvalidateQueries();
  return useMutation({
    mutationFn: (data: FormData) => userService.updateCurrentUser(data),
    onSuccess: (response) => {
      const updatedUser = response.data;
      queryClient.setQueryData(['currentUser'], updatedUser);
      invalidate('getCurrentUser');
    },
  });
};

export const useCreateUser = () => {
  const invalidate = useInvalidateQueries();
  return useMutation({
    mutationFn: (data: UserCreate) => userService.createUser(data),
    onSuccess: () => {
      invalidate('getCurrentUser');
    },
  });
};

export const useUserById = (userId: string) => {
  return useQuery({
    queryKey: ['user', userId],
    queryFn: () => userService.getUserById(userId).then((res) => res.data),
    enabled: !!userId,
  });
};
