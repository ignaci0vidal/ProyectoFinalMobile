import { ImageSourcePropType } from 'react-native';

export type RecipeIngredient = {
  name: string;
  amount: string;
  unit: string;
};

export type Recipe = {
  id: string;
  userId: string;
  title: string;
  category: string;
  description: string;
  ingredients: RecipeIngredient[];
  steps: string;
  cookingTime: number;
  imageUri?: string;
  imageSource?: ImageSourcePropType;
  isFavorite: boolean;
  createdAt: string;
};
