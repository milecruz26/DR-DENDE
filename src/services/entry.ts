import { Entry } from '@/interfaces';
import { api } from './apiTeste';

export const entryService = {
  getAllEntries: () => api.get<Entry[]>('/entries'),
  getEntryById: (id: string) => api.get<Entry>(`/entries/${id}`),
};