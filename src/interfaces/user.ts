export type UserType = 'common' | 'staff' | 'establishment';

export interface User {
  id: string;
  username: string;
  email: string;
  user_type: UserType;
  address: string | null;
  role: string | null;
  confirmed?: boolean;
  password?: string; // apenas para mock
  avatar?: string; // URL da foto de perfil

  // Campos específicos para estabelecimento
  phone?: string;
  cnpj?: string;
  min_price?: number;
  max_price?: number;
  coupon_enabled?: boolean;
  coupon_percentage?: number;
  coupon_uses_per_user?: number;
  social?: {
    instagram?: string;
    facebook?: string;
    youtube?: string;
    linkedin?: string;
  };
  opening_hours?: {
    day: string;
    open: string;
    close: string;
  }[];
  // Opcional: foto da capa e logo
  cover_image?: string;
  logo_image?: string;
}

export interface UserCreate {
  username: string;
  email: string;
  password: string;
}
