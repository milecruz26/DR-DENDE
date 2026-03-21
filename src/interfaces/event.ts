import { Address } from './address';

export interface Event {
  id?: string;                   // UUID (opcional na criação)
  name: string;
  event_date: string;            // formato ISO (YYYY-MM-DD)
  description: string;
  address: Address;
}