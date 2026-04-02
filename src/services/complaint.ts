// src/services/complaint.ts
import type { Complaint } from '../interfaces';
import { api } from './apiTeste';

type CreateComplaintDTO = {
  establishment_id: string;
  title: string;
  complaint_text: string;
};

export const complaintService = {
  getSelfComplaints: () => api.get<Complaint[]>('/complaints/me'),

  createComplaint: (data: CreateComplaintDTO) => api.post('/complaints', data),
};
