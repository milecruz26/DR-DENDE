import { User, UserCreate } from '../interfaces';
import { api } from './apiTeste';

export const userService = {
  // GET /users/common
  getCurrentUser: () => api.get<User>('/users/common'),

  // PUT /users/common
  updateCurrentUser: (data: FormData) =>
    api.put<User>('/users/common', data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),

  // POST /users/common
  createUser: (data: UserCreate) => api.post<User>('/users/common', data),

  // GET /staff/user/{user_id}
  getUserById: (userId: string) => api.get<User>(`/staff/user/${userId}`),
};