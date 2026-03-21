import { api } from './api';
import { User, Complaint, ComplaintValidation, Entry, Event } from '../interfaces';

export const staffService = {
  // POST /staff/user
  createStaffUser: (data: User) => api.post<User>('/staff/user', data),

  // DELETE /staff/user/{user_id}
  deleteUser: (userId: string) => api.delete<void>(`/staff/user/${userId}`),

  // GET /staff/complaints/{user_id}
  getComplaintsByUser: (userId: string) => api.get<Complaint[]>(`/staff/complaints/${userId}`),

  // POST /staff/complaints (validação)
  validateComplaint: (data: ComplaintValidation) => api.post<void>('/staff/complaints', data),

  // DELETE /staff/complaints/{complaint_id}
  deleteComplaint: (complaintId: string) => api.delete<void>(`/staff/complaints/${complaintId}`),

  // GET /staff/entry/{entry_id}
  getEntry: (entryId: string) => api.get<Entry>(`/staff/entry/${entryId}`),

  // DELETE /staff/entry/{entry_id}
  deleteEntry: (entryId: string) => api.delete<void>(`/staff/entry/${entryId}`),

  // PUT /staff/entry
  updateEntry: (data: Entry) => api.put<Entry>('/staff/entry', data),

  // POST /staff/entry
  createEntry: (data: Omit<Entry, 'id'>) => api.post<Entry>('/staff/entry', data),

  // GET /staff/event/all
  getAllEvents: () => api.get<Event[]>('/staff/event/all'),

  // GET /staff/event/{event_id}
  getEvent: (eventId: string) => api.get<Event>(`/staff/event/${eventId}`),

  // DELETE /staff/event/{event_id}
  deleteEvent: (eventId: string) => api.delete<void>(`/staff/event/${eventId}`),

  // PUT /staff/event
  updateEvent: (data: Event) => api.put<Event>('/staff/event', data),

  // POST /staff/event
  createEvent: (data: Omit<Event, 'id'>) => api.post<Event>('/staff/event', data),
};