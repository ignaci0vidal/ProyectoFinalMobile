export type Recipe = {
  id: string;
  userId: string; // cada receta está asociada a un usuario
  title: string;
  category: string;
  description: string;
  ingredients: string;
  steps: string;
  cookingTime: number;
  imageUri?: string;
  isFavorite: boolean;
  createdAt: string;
};