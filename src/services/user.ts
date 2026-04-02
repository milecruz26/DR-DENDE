import type { User, UserCreate } from '../interfaces';
import type { EstablishmentResponse } from '../interfaces/establishment';
import { api } from './apiTeste';

const getCurrentUser = () => api.get<User>('/users/common');

const getCurrentEstablishment = () => api.get<EstablishmentResponse>('/establishments');

const updateCurrentUser = (data: FormData) =>
  api.put<User>('/users/common', data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

const createUser = (data: UserCreate) => api.post<User>('/users/common', data);

const getUserById = (userId: string) => api.get<User>(`/staff/user/${userId}`);

export const userService = {
  getCurrentUser,
  getCurrentEstablishment,
  updateCurrentUser,
  createUser,
  getUserById,
};
