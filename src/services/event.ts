// src/services/event.ts
import type { Event } from '../interfaces';
import { api } from './apiTeste';

export const eventService = {
  // GET /events/ongoing/all
  getOngoingEvents: (offset = 0, limit = 50) =>
    api.get<Event[]>('/events/ongoing/all', { params: { offset, limit } }),

  // GET /events/nearby
  getNearbyEvents: (lat: number, lon: number, radius = 10.0) =>
    api.get<Event[]>('/events/nearby', { params: { lat, lon, radius } }),

  // GET /events/{event_id}
  getEventById: (eventId: string) => api.get<Event>(`/events/${eventId}`),
};
