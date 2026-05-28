import { Recipe } from '../types/recipe';

export const getRecipeCategories = (recipes: Recipe[]) => {
  return Array.from(new Set(recipes.map((recipe) => recipe.category)));
};

export const getRecipesByCategory = (recipes: Recipe[], category: string) => {
  return recipes.filter((recipe) => recipe.category === category);
};

export const getFavoriteRecipes = (recipes: Recipe[]) => {
  return recipes.filter((recipe) => recipe.isFavorite);
};

export const formatTimer = (secondsLeft: number) => {
  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;

  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(
    2,
    '0'
  )}`;
};