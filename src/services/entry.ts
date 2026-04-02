// src/services/entry.ts
import type { Entry } from '@/interfaces';
import { api } from './apiTeste';

export const entryService = {
  // GET /staff/entry/all
  getAllEntries: () =>
    api.get('/staff/entry/all', {
      params: {
        offset: 0,
        limit: 100,
      },
    }),

  // GET /staff/entry/{entry_id}
  getEntryById: (id: string) => api.get<Entry>(`/staff/entry/${id}`),
};
