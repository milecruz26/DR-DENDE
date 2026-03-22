import { User } from '../interfaces';
import { api } from './apiTeste';

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
  login: (credentials: LoginCredentials) => {
    const params = new URLSearchParams();

    Object.entries(credentials).forEach(([key, value]) => {
      if (value) {
        params.append(key, value);
      }
    });

    return api.post<LoginResponse>('/token', params, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });
  },

  // GET /users/me
  getCurrentUser: () => api.get<User>('/users/me'),
};