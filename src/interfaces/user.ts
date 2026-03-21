export type UserType = 'common' | 'staff' | 'establishment';

export interface User {
  id: string;               // UUID
  username: string;
  email: string;
  user_type: UserType;
  address: string | null;
  role: string | null;
}

export interface UserCreate extends Omit<User, 'id'> {
  // pode ser usado para criação
}