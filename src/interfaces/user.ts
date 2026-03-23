export type UserType = 'common' | 'staff' | 'establishment';

export interface User {
  id: string;
  username: string;
  email: string;
  user_type: UserType;
  address: string | null;
  role: string | null;
  confirmed?: boolean;
  password?: string; // apenas para mock (não é retornado pela API real)
  avatar?: string;          // URL ou base64
  phone?: string;
  city?: string;            // cidade (ex: Salvador – BA)
  zip_code?: string;
}

export interface UserCreate {
  username: string;
  email: string;
  password?: string;
  user_type: UserType;
  address?: string | null;
  role?: string | null;
}