// hooks/useEntries.ts
import { entryService } from '@/services/entry';
import { useQuery } from '@tanstack/react-query';

export const useAllEntries = () => {
  return useQuery({
    queryKey: ['entries'],
    queryFn: () => entryService.getAllEntries().then(res => res.data),
    staleTime: 1000 * 60 * 5, // 5 minutos sem refetch
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
};

export const useEntryById = (id: string) => {
  return useQuery({
    queryKey: ['entry', id],
    queryFn: () => entryService.getEntryById(id).then(res => res.data),
    enabled: !!id,
  });
};