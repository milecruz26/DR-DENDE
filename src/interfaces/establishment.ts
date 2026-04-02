import { UserType } from './user';

export interface EstablishmentCreate {
  username: string;
  email: string;
  password: string;
  business_name: string;
  address: string;
  latitude: number;
  longitude: number;
  phone?: string | null;
}

export interface EstablishmentResponse {
  id: string;
  business_name: string;
  username: string;
  email: string;
  address: string;
  user_type: UserType;
  latitude: number;
  longitude: number;
  logo_path: string | null;
  image_path: string | null;
}
