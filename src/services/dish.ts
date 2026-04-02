import type { Dish } from '../interfaces';
import { api } from './apiTeste';

export const dishService = {
  // POST /dishes/like/{dish_id}
  likeDish: (dishId: string) => api.post<void>(`/dishes/like/${dishId}`),

  // DELETE /dishes/dislike/{dish_id}
  dislikeDish: (dishId: string) => api.delete<void>(`/dishes/dislike/${dishId}`),

  // GET /dishes/liked
  getLikedDishes: () => api.get<Dish[]>('/dishes/liked'),
};
