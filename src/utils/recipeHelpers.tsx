import { Recipe, RecipeIngredient } from '../types/recipe';

export const normalizeText = (text: string) =>
  text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');

export const getRecipeCategories = (recipes: Recipe[]) => {
  return Array.from(new Set(recipes.map((recipe) => recipe.category)));
};

export const getRecipesByCategory = (recipes: Recipe[], category: string) => {
  return recipes.filter((recipe) => recipe.category === category);
};

export const getFavoriteRecipes = (recipes: Recipe[]) => {
  return recipes.filter((recipe) => recipe.isFavorite);
};

const splitAmountAndUnit = (value: string) => {
  const trimmedValue = value.trim();

  if (!trimmedValue) {
    return {
      amount: '',
      unit: '',
    };
  }

  const [amount, ...unitParts] = trimmedValue.split(/\s+/);

  return {
    amount,
    unit: unitParts.join(' '),
  };
};

export const parseIngredientsText = (ingredients: string): RecipeIngredient[] => {
  return ingredients
    .split('\n')
    .filter((line) => line.trim().length > 0)
    .map((line) => {
      const [namePart, ...amountParts] = line.split(':');
      const { amount, unit } = splitAmountAndUnit(amountParts.join(':'));

      return {
        name: namePart.trim(),
        amount,
        unit,
      };
    })
    .filter((ingredient) => ingredient.name.length > 0);
};

export const formatIngredient = (ingredient: RecipeIngredient) => {
  const quantity = [ingredient.amount, ingredient.unit]
    .filter((value) => value.trim().length > 0)
    .join(' ');

  return quantity ? `${ingredient.name}: ${quantity}` : ingredient.name;
};

export const getIngredientsSearchText = (ingredients: RecipeIngredient[]) => {
  return ingredients
    .map((ingredient) => formatIngredient(ingredient))
    .join(' ');
};

export const formatTimer = (secondsLeft: number) => {
  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;

  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(
    2,
    '0'
  )}`;
};
