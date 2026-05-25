import * as Haptics from 'expo-haptics';
import React, { createContext, useContext, useMemo, useState } from 'react';
import { Recipe } from '../types/recipe';

import { initialRecipes } from './initialRecipes';

type RecipeInput = Omit<Recipe, 'id' | 'createdAt'>;

type RecipesContextType = {
  recipes: Recipe[];
  addRecipe: (recipe: RecipeInput) => Promise<void>;
  updateRecipe: (recipeId: string, data: RecipeInput) => Promise<void>;
  deleteRecipe: (recipeId: string) => Promise<void>;
  toggleFavorite: (recipeId: string) => Promise<void>;
};

const RecipesContext = createContext<RecipesContextType | null>(null);

export const useRecipes = () => {
  const context = useContext(RecipesContext);

  if (!context) {
    throw new Error('useRecipes debe usarse dentro de RecipesProvider');
  }

  return context;
};

type Props = {
  children: React.ReactNode;
};

export const RecipesProvider: React.FC<Props> = ({ children }) => {
  const [recipes, setRecipes] = useState<Recipe[]>(initialRecipes);

  const addRecipe = async (recipe: RecipeInput) => {
    const newRecipe: Recipe = {
      ...recipe,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };

    setRecipes((prev) => [newRecipe, ...prev]);

    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  };

  const updateRecipe = async (recipeId: string, data: RecipeInput) => {
    setRecipes((prev) =>
      prev.map((recipe) =>
        recipe.id === recipeId
          ? {
              ...recipe,
              ...data,
            }
          : recipe
      )
    );

    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  };

  const deleteRecipe = async (recipeId: string) => {
    setRecipes((prev) => prev.filter((recipe) => recipe.id !== recipeId));

    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
  };

  const toggleFavorite = async (recipeId: string) => {
    setRecipes((prev) =>
      prev.map((recipe) =>
        recipe.id === recipeId
          ? {
              ...recipe,
              isFavorite: !recipe.isFavorite,
            }
          : recipe
      )
    );

    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  const value = useMemo(
    () => ({
      recipes,
      addRecipe,
      updateRecipe,
      deleteRecipe,
      toggleFavorite,
    }),
    [recipes]
  );

  return (
    <RecipesContext.Provider value={value}>{children}</RecipesContext.Provider>
  );
};