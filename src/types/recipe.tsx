export type Recipe = {
  id: string;
  userId: string;
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