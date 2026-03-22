import { Complaint } from '../interfaces';
import { api } from './apiTeste';

export const complaintService = {
  // GET /complaints/me
  getSelfComplaints: () => api.get<Complaint[]>('/complaints/me'),

  // POST /complaints
  createComplaint: (data: Partial<Complaint>) => api.post<Complaint>('/complaints', data),
};