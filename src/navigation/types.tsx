import { NavigatorScreenParams } from '@react-navigation/native';

export type RootTabParamList = {
  Inicio: undefined;
  Recetas: NavigatorScreenParams<RecipeStackParamList> | undefined;
  Timer: undefined;
  Ajustes: undefined;
};

export type RecipeStackParamList = {
  RecipeList: { category?: string } | undefined;
  RecipeDetail: { recipeId: string };
  RecipeEdit: { recipeId: string };
  RecipeCreate: undefined;
  RecipeCategories: undefined;
  FavoriteRecipes: undefined;
};
