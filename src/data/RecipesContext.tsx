import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Haptics from 'expo-haptics';
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Platform } from 'react-native';

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

//const RECIPES_STORAGE_KEY = '@proyecto_final_mobile_recipes';
//const SEEDED_USERS_STORAGE_KEY = '@proyecto_final_mobile_seeded_users';
const RECIPES_STORAGE_KEY = '@proyecto_final_mobile_recipes_v2';
const SEEDED_USERS_STORAGE_KEY = '@proyecto_final_mobile_seeded_users_v2';


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

const notifySuccess = async () => {
  if (Platform.OS === 'web') return;

  try {
    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  } catch (error) {
    console.log('Haptics no disponible:', error);
  }
};

const notifyWarning = async () => {
  if (Platform.OS === 'web') return;

  try {
    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
  } catch (error) {
    console.log('Haptics no disponible:', error);
  }
};

const notifyLightImpact = async () => {
  if (Platform.OS === 'web') return;

  try {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  } catch (error) {
    console.log('Haptics no disponible:', error);
  }
};

export const RecipesProvider: React.FC<Props> = ({ children }) => {
  const { currentUser } = useAuth();

  const [allRecipes, setAllRecipes] = useState<Recipe[]>([]);
  const [seededUserIds, setSeededUserIds] = useState<string[]>([]);
  const [hasLoadedStorage, setHasLoadedStorage] = useState(false);


  useEffect(() => {
    const loadRecipesFromStorage = async () => {
      try {
        const [storedRecipes, storedSeededUserIds] = await Promise.all([
          AsyncStorage.getItem(RECIPES_STORAGE_KEY),
          AsyncStorage.getItem(SEEDED_USERS_STORAGE_KEY),
        ]);

        if (storedRecipes) {
          setAllRecipes(JSON.parse(storedRecipes));
        } else {
          setAllRecipes(initialRecipes);
        }

        if (storedSeededUserIds) {
          setSeededUserIds(JSON.parse(storedSeededUserIds));
        } else {
          setSeededUserIds(getSeededUserIds());
        }
      } catch (error) {
        console.log('Error al cargar recetas desde AsyncStorage:', error);
      } finally {
        setHasLoadedStorage(true);
      }
    };

    loadRecipesFromStorage();
  }, []);

  useEffect(() => {
    if (!hasLoadedStorage) return;

    const saveRecipesInStorage = async () => {
      try {
        await Promise.all([
          AsyncStorage.setItem(
            RECIPES_STORAGE_KEY,
            JSON.stringify(allRecipes)
          ),
          AsyncStorage.setItem(
            SEEDED_USERS_STORAGE_KEY,
            JSON.stringify(seededUserIds)
          ),
        ]);
      } catch (error) {
        console.log('Error al guardar recetas en AsyncStorage:', error);
      }
    };

    saveRecipesInStorage();
  }, [allRecipes, seededUserIds, hasLoadedStorage]);

  useEffect(() => {
    if (!hasLoadedStorage) return;
    if (!currentUser) return;

    const alreadySeeded = seededUserIds.includes(currentUser.id);

    if (alreadySeeded) return;

    const starterRecipes = createStarterRecipesForUser(currentUser.id);

    setAllRecipes((prev) => [...starterRecipes, ...prev]);
    setSeededUserIds((prev) => [...prev, currentUser.id]);
  }, [currentUser, seededUserIds, hasLoadedStorage]);

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

    await notifySuccess();
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

    await notifyWarning();
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

    await notifyLightImpact();
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