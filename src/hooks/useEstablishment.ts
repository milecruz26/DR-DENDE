import { useMutation, useQuery } from '@tanstack/react-query';
import { useAuth } from '@/context/AuthContext';
import type { EstablishmentCreate } from '@/interfaces/establishment';
import { establishmentService } from '../services/establishment';
import { useInvalidateQueries } from './useInvalidateQueries';

export const useEstablishmentUser = () => {
  return useQuery({
    queryKey: ['establishmentUser'],
    queryFn: () => establishmentService.getEstablishmentUser().then((res) => res.data),
  });
};

export const useEstablishments = () => {
  const { user } = useAuth();
  return useQuery({
    queryKey: ['establishments'],
    queryFn: () => establishmentService.getAllEstablishments().then((res) => res.data),
    select: (data) => {
      if (!data) return [];

      // Ordenação: se for estabelecimento logado, coloca ele no topo
      let establishments = [...data];
      if (user?.user_type === 'establishment') {
        const self = establishments.find((e) => e.id === user.id);
        const others = establishments.filter((e) => e.id !== user.id);
        // Ordena os outros alfabeticamente
        others.sort((a, b) => a.username.localeCompare(b.username));
        establishments = self ? [self, ...others] : others;
      } else {
        // Usuário comum ou staff: ordem alfabética
        establishments.sort((a, b) => a.username.localeCompare(b.username));
      }
      return establishments;
    },
  });
};

export const useCreateEstablishment = () => {
  return useMutation({
    mutationFn: (data: EstablishmentCreate) => establishmentService.createEstablishmentUser(data),
  });
};

export const useUpdateEstablishmentUser = () => {
  const invalidate = useInvalidateQueries();
  return useMutation({
    mutationFn: (formData: FormData) => establishmentService.updateEstablishmentUser(formData),
    onSuccess: () => {
      invalidate('getEstablishmentUser');
      invalidate('getCurrentUser');
      invalidate('getAllEstablishments');
    },
  });
};

export const useSelfPostedDishes = () => {
  return useQuery({
    queryKey: ['selfPostedDishes'],
    queryFn: () => establishmentService.getSelfPostedDishes().then((res) => res.data),
  });
};

export const useEstablishmentDishes = (establishmentId: string) => {
  return useQuery({
    queryKey: ['establishmentDishes', establishmentId],
    queryFn: () =>
      establishmentService.getEstablishmentDishes(establishmentId).then((res) => res.data),
    enabled: !!establishmentId,
  });
};

export const useCreateDish = () => {
  const { user } = useAuth();
  const invalidate = useInvalidateQueries();
  return useMutation({
    mutationFn: (formData: FormData) => establishmentService.createDish(formData),
    onSuccess: () => {
      invalidate('getSelfPostedDishes');
      if (user?.user_type === 'establishment') {
        invalidate('getEstablishmentDishes', user.id);
      }
    },
  });
};
