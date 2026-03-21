export interface Dish {
  id: string;                     // UUID
  name: string;
  dish_image_path: string;
  associated_entry: string;      // UUID do prato associado
  establishment_id?: string;     // UUID do estabelecimento
}