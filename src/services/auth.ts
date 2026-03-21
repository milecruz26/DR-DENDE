import { api } from './api';
import { User } from '../interfaces';

interface LoginCredentials {
  username: string;
  password: string;
  grant_type?: string;
  scope?: string;
  client_id?: string;
  client_secret?: string;
}

interface LoginResponse {
  access_token: string;
  token_type: string;
}

export const authService = {
  // POST /token (OAuth2)
  login: (credentials: LoginCredentials) =>
    api.post<LoginResponse>('/token', new URLSearchParams(credentials), {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    }),

  // GET /users/me
  getCurrentUser: () => api.get<User>('/users/me'),
};