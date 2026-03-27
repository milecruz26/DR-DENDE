import { Complaint, ComplaintValidation, Entry, Event, EventCreate, User } from '../interfaces';
import { api } from './apiTeste';

// ── Users ──────────────────────────────────────────────
const createStaffUser = (data: User) =>
  api.post<User>('/staff/user', data);

const deleteUser = (userId: string) =>
  api.delete<void>(`/staff/user/${userId}`);

// ── Complaints ─────────────────────────────────────────
const getComplaintsByUser = (userId: string) =>
  api.get<Complaint[]>(`/staff/complaints/${userId}`);

const validateComplaint = (data: ComplaintValidation) =>
  api.post<void>('/staff/complaints/validate', data);

const deleteComplaint = (complaintId: string) =>
  api.delete<void>(`/staff/complaints/${complaintId}`);

// ── Entries (Verbetes) ─────────────────────────────────
const getEntry = (entryId: string) =>
  api.get<Entry>(`/staff/entry/${entryId}`);

const createEntry = (data: Omit<Entry, 'id'>) =>
  api.post<Entry>('/staff/entry', data);

const updateEntry = (data: Entry) =>
  api.put<Entry>(`/staff/entry/${data.id}`, data);

const deleteEntry = (entryId: string) =>
  api.delete<void>(`/staff/entry/${entryId}`);

// ── Events ─────────────────────────────────────────────
const getAllEvents = (offset = 0, limit = 50) =>
  api.get<Event[]>('/staff/events/all', { params: { offset, limit } });

const getEvent = (eventId: string) =>
  api.get<Event>(`/events/${eventId}`);

const createEvent = (data: EventCreate) =>
  api.post<Event>('/staff/event', data);

const updateEvent = (eventId: string, data: EventCreate) =>
  api.put<Event>(`/staff/event/${eventId}`, data);

const deleteEvent = (eventId: string) =>
  api.delete<void>(`/staff/event/${eventId}`);

// ── Export ──────────────────────────────────────────────
export const staffService = {
  createStaffUser,
  deleteUser,
  getComplaintsByUser,
  validateComplaint,
  deleteComplaint,
  getEntry,
  createEntry,
  updateEntry,
  deleteEntry,
  getAllEvents,
  getEvent,
  createEvent,
  updateEvent,
  deleteEvent,
};
