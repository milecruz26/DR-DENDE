// src/hooks/useStaff.ts
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { staffService } from '../services/staff';

// Exemplo para eventos
export const useAllEvents = () => {
  return useQuery({
    queryKey: ['events'],
    queryFn: () => staffService.getAllEvents().then(res => res.data),
    staleTime: 1000 * 60 * 10, // 5 minutos sem refetch
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
};

//Criar evento
export const useCreateEvent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: staffService.createEvent,

    onSuccess: (data) => {
      console.log('✅ EVENTO CRIADO:', data);
      queryClient.invalidateQueries({ queryKey: ['events'] });
    },

    onError: (error: any) => {
      console.log('❌ ERRO AO CRIAR EVENTO:', error.response?.data, error.response?.status);
    },
  });
};


// Criar entry
export const useCreateEntry = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: staffService.createEntry,

    onSuccess: () => {
      // invalida lista de entries (caso você use depois)
      queryClient.invalidateQueries({ queryKey: ['entries'] });
    },
  });
};

// Atualizar entry
export const useUpdateEntry = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: staffService.updateEntry,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['entries'] });
    },
  });
};

// Deletar entry
export const useDeleteEntry = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: staffService.deleteEntry,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['entries'] });
    },
  });
};

export const useAllComplaints = () => {
  return useQuery({
    queryKey: ['complaints'],
    queryFn: () => staffService.getAllComplaints().then(res => res.data),
  });
};

// Deletar denúncia
export const useDeleteComplaint = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: staffService.deleteComplaint,

    onSuccess: () => {
      // Atualiza lista de denúncias
      queryClient.invalidateQueries({ queryKey: ['complaints'] });
    },

    onError: (error: any) => {
      console.log(
        '❌ ERRO AO DELETAR DENÚNCIA:',
        error.response?.data,
        error.response?.status
      );
    },
  });
};