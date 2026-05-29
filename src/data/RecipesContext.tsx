import * as Haptics from 'expo-haptics';
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Recipe } from '../types/recipe';
import { useAuth } from './AuthContext';
import { createStarterRecipesForUser, initialRecipes } from './initialRecipes';

type RecipeInput = Omit<Recipe, 'id' | 'createdAt' | 'userId'>;

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

const getSeededUserIds = () => {
  return Array.from(new Set(initialRecipes.map((recipe) => recipe.userId)));
};

export const RecipesProvider: React.FC<Props> = ({ children }) => {
  const { currentUser } = useAuth();

  const [allRecipes, setAllRecipes] = useState<Recipe[]>(initialRecipes);
  const [seededUserIds, setSeededUserIds] = useState<string[]>(getSeededUserIds);

  useEffect(() => {
    if (!currentUser) return;

    const alreadySeeded = seededUserIds.includes(currentUser.id);

    if (alreadySeeded) return;

    const starterRecipes = createStarterRecipesForUser(currentUser.id);

    setAllRecipes((prev) => [...starterRecipes, ...prev]);
    setSeededUserIds((prev) => [...prev, currentUser.id]);
  }, [currentUser, seededUserIds]);

  const recipes = useMemo(() => {
    if (!currentUser) return [];

    return allRecipes.filter((recipe) => recipe.userId === currentUser.id);
  }, [allRecipes, currentUser]);

  const addRecipe = async (recipe: RecipeInput) => {
    if (!currentUser) return;

    const newRecipe: Recipe = {
      ...recipe,
      id: `${currentUser.id}-${Date.now()}`,
      userId: currentUser.id,
      createdAt: new Date().toISOString(),
    };

    setAllRecipes((prev) => [newRecipe, ...prev]);

    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  };

  const updateRecipe = async (recipeId: string, data: RecipeInput) => {
    if (!currentUser) return;

    setAllRecipes((prev) =>
      prev.map((recipe) =>
        recipe.id === recipeId && recipe.userId === currentUser.id
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
    if (!currentUser) return;

    setAllRecipes((prev) =>
      prev.filter(
        (recipe) =>
          !(recipe.id === recipeId && recipe.userId === currentUser.id)
      )
    );

    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
  };

  const toggleFavorite = async (recipeId: string) => {
    if (!currentUser) return;

    setAllRecipes((prev) =>
      prev.map((recipe) =>
        recipe.id === recipeId && recipe.userId === currentUser.id
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