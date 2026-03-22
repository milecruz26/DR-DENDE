import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { dishService } from '../services/dish';

export const useLikedDishes = () => {
  return useQuery({
    queryKey: ['likedDishes'],
    queryFn: () => dishService.getLikedDishes().then(res => res.data),
  });
};

export const useLikeDish = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (dishId: string) => dishService.likeDish(dishId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['likedDishes'] });
    },
  });
};

export const useDislikeDish = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (dishId: string) => dishService.dislikeDish(dishId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['likedDishes'] });
    },
  });
};