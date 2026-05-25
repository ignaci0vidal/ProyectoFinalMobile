export type RootTabParamList = {
  Inicio: undefined;
  Recetas: undefined;
  Nueva: undefined;
  Categorias: undefined;
  Ajustes: undefined;
};

export type RecipeStackParamList = {
  RecipeList: undefined;
  RecipeDetail: { recipeId: string };
  RecipeEdit: { recipeId: string };
};