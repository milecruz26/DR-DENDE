import { Entry } from '@/interfaces';
import { api } from './apiTeste';

export const entryService = {
  // GET /staff/entry/all
  getAllEntries: (offset = 0, limit = 100) =>
    api.get<Entry[]>('/staff/entry/all', { params: { offset, limit } }),

  // GET /staff/entry/{entry_id}
  getEntryById: (id: string) => api.get<Entry>(`/staff/entry/${id}`),
};