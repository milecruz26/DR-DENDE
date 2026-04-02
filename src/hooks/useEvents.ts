// src/hooks/useEvents.ts
import { useQuery } from '@tanstack/react-query';
import { eventService } from '../services/event';

export const useOngoingEvents = (offset = 0, limit = 50) => {
  return useQuery({
    queryKey: ['events', 'ongoing', offset, limit],
    queryFn: () => eventService.getOngoingEvents(offset, limit).then(res => res.data),
  });
};

export const useNearbyEvents = (lat: number, lon: number, radius = 10.0) => {
  return useQuery({
    queryKey: ['events', 'nearby', lat, lon, radius],
    queryFn: () => eventService.getNearbyEvents(lat, lon, radius).then(res => res.data),
    enabled: lat !== 0 && lon !== 0,
  });
};

export const useEventById = (eventId: string) => {
  return useQuery({
    queryKey: ['events', eventId],
    queryFn: async () => {
      try {
        const res = await eventService.getEventById(eventId);
        console.log('📡 EVENTO DETALHADO:', res.data);
        return res.data;
      } catch (error: any) {
        console.log('❌ ERRO AO BUSCAR EVENTO:', error.response?.data);
        throw error;
      }
    },
    enabled: !!eventId,
  });
};
