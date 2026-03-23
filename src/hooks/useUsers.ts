import { UserCreate } from '@/interfaces/user';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { userService } from '../services/user';

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: userService.updateCurrentUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentUser'] });
    },
  });
};

export const useCreateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: UserCreate) => userService.createUser(data),
    onSuccess: () => {
      // Opcional: invalidar alguma query de usuários se necessário
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
};

export const useUserById = (userId: string) => {
  return useQuery({
    queryKey: ['user', userId],
    queryFn: () => userService.getUserById(userId).then(res => res.data),
    enabled: !!userId,
  });
};