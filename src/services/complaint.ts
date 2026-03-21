import { api } from './api';
import { Complaint } from '../interfaces';

export const complaintService = {
  // GET /complaints/me
  getSelfComplaints: () => api.get<Complaint[]>('/complaints/me'),

  // POST /complaints
  createComplaint: (data: Partial<Complaint>) => api.post<Complaint>('/complaints', data),
};