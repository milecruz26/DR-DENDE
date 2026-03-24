import { User, UserCreate } from '../interfaces';
import { api } from './apiTeste';

export const userService = {
  // GET /users/me (usuário autenticado)
  getCurrentUser: () => api.get<User>('/users/me'),
  // PUT /users/me
  updateCurrentUser: (data: FormData) =>
    api.put<User>('/users/me', data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),

  // POST /users (registro de novo usuário comum)
  createUser: (data: UserCreate) => { api.post<User>('/users', data, { headers: { 'Content-Type': 'application/json' } }); return api.post<User>('/users', data); },

  // GET /users/{user_id}
  getUserById: (userId: string) => api.get<User>(`/users/${userId}`),


};