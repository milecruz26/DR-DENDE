import { Complaint, ComplaintValidation, Entry, Event, EventCreate, User } from '../interfaces';
import { api } from './apiTeste';

export const staffService = {
  // POST /staff/user
  createStaffUser: (data: User) => api.post<User>('/staff/user', data),

  // DELETE /staff/user/{user_id}
  deleteUser: (userId: string) => api.delete<void>(`/staff/user/${userId}`),

  // GET /staff/complaints/{user_id}
  getComplaintsByUser: (userId: string) => api.get<Complaint[]>(`/staff/complaints/${userId}`),

  // POST /staff/complaints/validate
  validateComplaint: (data: ComplaintValidation) => api.post<void>('/staff/complaints/validate', data),

  // DELETE /staff/complaints/{complaint_id}
  deleteComplaint: (complaintId: string) => api.delete<void>(`/staff/complaints/${complaintId}`),

  // GET /staff/entry/{entry_id}
  getEntry: (entryId: string) => api.get<Entry>(`/staff/entry/${entryId}`),

  // DELETE /staff/entry/{entry_id}
  deleteEntry: (entryId: string) => api.delete<void>(`/staff/entry/${entryId}`),

  // PUT /staff/entry/{entry_id}
  updateEntry: (data: Entry) => api.put<Entry>(`/staff/entry/${data.id}`, data),

  // POST /staff/entry
  createEntry: (data: Omit<Entry, 'id'>) => api.post<Entry>('/staff/entry', data),

  // GET /staff/events/all
  getAllEvents: (offset = 0, limit = 50) =>
    api.get<Event[]>('/staff/events/all', { params: { offset, limit } }),

  // GET /events/{event_id}
  getEvent: (eventId: string) => api.get<Event>(`/events/${eventId}`),

  // DELETE /staff/event/{event_id}
  deleteEvent: (eventId: string) => api.delete<void>(`/staff/event/${eventId}`),

  // PUT /staff/event/{event_id}
  updateEvent: (eventId: string, data: EventCreate) => api.put<Event>(`/staff/event/${eventId}`, data),

  // POST /staff/event
  createEvent: (data: EventCreate) => api.post<Event>('/staff/event', data),
};