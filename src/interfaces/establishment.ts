import { UserType } from './user';

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
