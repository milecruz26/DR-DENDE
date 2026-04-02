import type { UserType } from '../interfaces';
import { api } from './apiTeste';

interface LoginCredentials {
  username: string;
  password: string;
  grant_type?: string;
  scope?: string;
  client_id?: string;
  client_secret?: string;
}

export interface UserInfo {
  username: string;
  user_type: UserType;
  role: string | null;
  profile_id: string;
}

interface LoginResponse {
  access_token: string;
  token_type: string;
  user_info: UserInfo;
}

const login = (credentials: LoginCredentials) => {
  const params = new URLSearchParams();
  Object.entries(credentials).forEach(([key, value]) => {
    if (value) params.append(key, value);
  });

  return api.post<LoginResponse>('/login', params, {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  });
};

export const authService = { login };
