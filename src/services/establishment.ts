import { Dish, User } from '../interfaces';
import { api } from './apiTeste';

// ── Establishment ──────────────────────────────────────
const getEstablishmentUser = () =>
  api.get<User>('/establishments');

const updateEstablishmentUser = (data: Partial<User>) =>
  api.put<User>('/establishments', data);

const createEstablishmentUser = (data: User) =>
  api.post<User>('/establishments', data);

// ── Dishes ─────────────────────────────────────────────
const getSelfPostedDishes = () =>
  api.get<Dish[]>('/establishments/dish');

const createDish = (data: Omit<Dish, 'id'>) =>
  api.post<Dish>('/establishments/dish', data);

const updateDish = (data: Dish) =>
  api.put<Dish>(`/establishments/dish/${data.id}`, data);

const deleteDish = (dishId: string) =>
  api.delete<void>(`/establishments/dish/${dishId}`);

// ── Export ──────────────────────────────────────────────
export const establishmentService = {
  // GET /establishments
  getEstablishmentUser: () => api.get<User>('/establishments'),

  getAllEstablishments: () => api.get<User[]>('/establishments/all'),

  // PUT /establishments
  updateEstablishmentUser: (formData: FormData) =>
    api.put<User>('/establishments', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),

  // POST /establishments
  createEstablishmentUser: (data: User) => api.post<User>('/establishments', data),

  // GET /establishments/dish
  getSelfPostedDishes: () => api.get<Dish[]>('/establishments/dish'),

  getEstablishmentDishes: (establishmentId: string) => api.get<Dish[]>(`/establishments/${establishmentId}/dishes`),

  // PUT /establishments/dish/{dish_id}
  updateDish: (data: Dish) => api.put<Dish>(`/establishments/dish/${data.id}`, data),

  // POST /establishments/dish
  createDish: (formData: FormData) =>
    api.post<Dish>('/establishments/dish', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),

  // DELETE /establishments/dish/{dish_id}
  deleteDish: (dishId: string) => api.delete<void>(`/establishments/dish/${dishId}`),
};
