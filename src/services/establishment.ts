import { api } from './api';
import { User, Dish } from '../interfaces';

export const establishmentService = {
  // GET /establishments/me
  getEstablishmentUser: () => api.get<User>('/establishments/me'),

  // PUT /establishments/user
  updateEstablishmentUser: (data: Partial<User>) => api.put<User>('/establishments/user', data),

  // POST /establishments/user
  createEstablishmentUser: (data: User) => api.post<User>('/establishments/user', data),

  // GET /establishments/dishes/me
  getSelfPostedDishes: () => api.get<Dish[]>('/establishments/dishes/me'),

  // PUT /establishments/dish
  updateDish: (data: Dish) => api.put<Dish>('/establishments/dish', data),

  // POST /establishments/dish
  createDish: (data: Omit<Dish, 'id'>) => api.post<Dish>('/establishments/dish', data),

  // DELETE /establishments/dish/{dish_id}
  deleteDish: (dishId: string) => api.delete<void>(`/establishments/dish/${dishId}`),
};