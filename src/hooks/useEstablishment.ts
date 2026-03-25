import { useAuth } from '@/context/AuthContext';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { establishmentService } from '../services/establishment';

export const useEstablishmentUser = () => {
  return useQuery({
    queryKey: ['establishmentUser'],
    queryFn: () => establishmentService.getEstablishmentUser().then(res => res.data),
  });
};

export const useEstablishments = () => {
  const { user } = useAuth();
  return useQuery({
    queryKey: ['establishments'],
    queryFn: () => establishmentService.getAllEstablishments().then(res => res.data),
    select: (data) => {
      if (!data) return [];

      // Ordenação: se for estabelecimento logado, coloca ele no topo
      let establishments = [...data];
      if (user?.user_type === 'establishment') {
        const self = establishments.find(e => e.id === user.id);
        const others = establishments.filter(e => e.id !== user.id);
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

export const useUpdateEstablishmentUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (formData: FormData) => establishmentService.updateEstablishmentUser(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['establishmentUser'] });
      queryClient.invalidateQueries({ queryKey: ['currentUser'] });
      queryClient.invalidateQueries({ queryKey: ['establishments'] });
    },
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
    mutationFn: (formData: FormData) => establishmentService.createDish(formData),
    onSuccess: () => {
      // Invalida as queries de pratos do estabelecimento para atualizar a lista
      queryClient.invalidateQueries({ queryKey: ['selfPostedDishes'] });
    },
  });
};