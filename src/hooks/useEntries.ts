// src/hooks/useEntries.ts

import { useQuery } from '@tanstack/react-query';
import { entryService } from '@/services/entry';

export const useAllEntries = () => {
  return useQuery({
    queryKey: ['entries'],
    queryFn: async () => {
      try {
        const res = await entryService.getAllEntries();
        console.log('📦 Entries da API:', res.data);
        return res.data;
      } catch (error: any) {
        console.log('❌ BACKEND ERROR:', error.response?.data);
        throw error; // ⚠️ importante manter isso
      }
    },

    staleTime: 1000 * 60 * 10,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
};

export const useEntryById = (id: string) => {
  return useQuery({
    queryKey: ['entry', id],
    queryFn: () => entryService.getEntryById(id).then((res) => res.data),
    enabled: !!id,
  });
};
