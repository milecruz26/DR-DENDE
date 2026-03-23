// hooks/useEntries.ts
import { entryService } from '@/services/entry';
import { useQuery } from '@tanstack/react-query';

export const useAllEntries = () => {
  return useQuery({
    queryKey: ['entries'],
    queryFn: () => entryService.getAllEntries().then(res => res.data),
  });
};

export const useEntryById = (id: string) => {
  return useQuery({
    queryKey: ['entry', id],
    queryFn: () => entryService.getEntryById(id).then(res => res.data),
    enabled: !!id,
  });
};