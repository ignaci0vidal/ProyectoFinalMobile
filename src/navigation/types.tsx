export type RootTabParamList = {
  Inicio: undefined;
  Recetas: undefined;
  Timer: undefined;
  Ajustes: undefined;
};

export type RecipeStackParamList = {
  RecipeList: undefined;
  RecipeDetail: { recipeId: string };
  RecipeEdit: { recipeId: string };
  RecipeCreate: undefined;
  RecipeCategories: undefined;
  FavoriteRecipes: undefined;
};