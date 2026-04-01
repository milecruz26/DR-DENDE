import { Address } from './address';

export interface Event {
  id: string | null;
  name: string;
  event_date: string;            // formato ISO (YYYY-MM-DD)
  description: string;
  address: Address;
  latitude?: number | null;
  longitude?: number | null;
  images?: string[];
}

export interface EventCreate {
  name: string;
  event_date: string;
  description: string;
  address: Address;
}