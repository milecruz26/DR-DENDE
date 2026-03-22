import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { establishmentService } from '../services/establishment';

export const useEstablishmentUser = () => {
  return useQuery({
    queryKey: ['establishmentUser'],
    queryFn: () => establishmentService.getEstablishmentUser().then(res => res.data),
  });
};

export const useSelfPostedDishes = () => {
  return useQuery({
    queryKey: ['selfPostedDishes'],
    queryFn: () => establishmentService.getSelfPostedDishes().then(res => res.data),
  });
};

export const useCreateDish = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: establishmentService.createDish,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['selfPostedDishes'] });
    },
  });
};