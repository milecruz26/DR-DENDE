import { useMutation, useQuery } from "@tanstack/react-query";
import { dishService } from "../services/dish";
import { useInvalidateQueries } from "./useInvalidateQueries";

export const useLikedDishes = () => {
  return useQuery({
    queryKey: ["likedDishes"],
    queryFn: () => dishService.getLikedDishes().then((res) => res.data),
    staleTime: 1000 * 60 * 5, // 5 minutos sem refetch
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
};

export const useLikeDish = () => {
  const invalidate = useInvalidateQueries();
  return useMutation({
    mutationFn: (dishId: string) => dishService.likeDish(dishId),
    onSuccess: () => {
      invalidate("getLikedDishes");
    },
  });
};

export const useDislikeDish = () => {
  const invalidate = useInvalidateQueries();
  return useMutation({
    mutationFn: (dishId: string) => dishService.dislikeDish(dishId),
    onSuccess: () => {
      invalidate("getLikedDishes");
    },
  });
};
