import { api } from './api';
import { User, UserCreate } from '../interfaces';

export const userService = {
  // PUT /users/me
  updateCurrentUser: (data: Partial<User>) => api.put<User>('/users/me', data),

  // POST /users (registro de novo usuário comum)
  createUser: (data: UserCreate) => api.post<User>('/users', data),

  // GET /users/{user_id}
  getUserById: (userId: string) => api.get<User>(`/users/${userId}`),
};