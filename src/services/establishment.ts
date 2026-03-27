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
  getEstablishmentUser,
  updateEstablishmentUser,
  createEstablishmentUser,
  getSelfPostedDishes,
  createDish,
  updateDish,
  deleteDish,
};
