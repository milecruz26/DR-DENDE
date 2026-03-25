import { Dish, User } from '../interfaces';
import { api } from './apiTeste';

export const establishmentService = {
  // GET /establishments
  getEstablishmentUser: () => api.get<User>('/establishments'),

  // PUT /establishments
  updateEstablishmentUser: (data: Partial<User>) => api.put<User>('/establishments', data),

  // POST /establishments
  createEstablishmentUser: (data: User) => api.post<User>('/establishments', data),

  // GET /establishments/dish
  getSelfPostedDishes: () => api.get<Dish[]>('/establishments/dish'),

  // PUT /establishments/dish/{dish_id}
  updateDish: (data: Dish) => api.put<Dish>(`/establishments/dish/${data.id}`, data),

  // POST /establishments/dish
  createDish: (data: Omit<Dish, 'id'>) => api.post<Dish>('/establishments/dish', data),

  // DELETE /establishments/dish/{dish_id}
  deleteDish: (dishId: string) => api.delete<void>(`/establishments/dish/${dishId}`),
};