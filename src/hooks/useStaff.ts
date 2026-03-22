import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { staffService } from '../services/staff';

// Exemplo para eventos
export const useAllEvents = () => {
  return useQuery({
    queryKey: ['events'],
    queryFn: () => staffService.getAllEvents().then(res => res.data),
  });
};

export const useCreateEvent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: staffService.createEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] });
    },
  });
};

// Outros hooks similares para entries, complaints, etc.