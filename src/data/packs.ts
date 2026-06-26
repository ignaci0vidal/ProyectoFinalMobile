import { Recipe } from '../types/recipe';
import { parseIngredientsText } from '../utils/recipeHelpers';

type PackRecipeTemplate = Omit<
  Recipe,
  'id' | 'userId' | 'ingredients' | 'createdAt'
> & {
  ingredients: string;
};

export type RecipePack = {
  id: string;
  name: string;
  description: string;
  recipes: Omit<Recipe, 'id' | 'userId' | 'createdAt'>[];
};

const buildPackRecipes = (
  recipes: PackRecipeTemplate[]
): RecipePack['recipes'] => {
  return recipes.map((recipe) => ({
    ...recipe,
    ingredients: parseIngredientsText(recipe.ingredients),
  }));
};

export const upcomingRecipePacks = [
  'Recetas sin TACC',
  'Salsas',
  'Postres',
  'Arroces',
  'Pescados',
  'Ensaladas',
  'Comida thai',
];

export const sauceRecipePack: RecipePack = {
  id: 'salsas',
  name: 'Salsas',
  description: 'Cuatro salsas clásicas para ampliar el recetario.',
  recipes: buildPackRecipes([
    {
      title: 'Salsa bechamel',
      category: 'Salsas',
      description:
        'Salsa blanca clásica a base de roux, leche y nuez moscada. Ideal para gratinados, pastas y verduras.',
      ingredients:
        'Manteca: 50 g\nHarina 0000: 50 g\nLeche: 500 ml\nSal fina: a gusto\nPimienta blanca: a gusto\nNuez moscada: a gusto',
      steps:
        '1- Derretir la manteca en una cacerola a fuego bajo.\n2- Agregar la harina y cocinar mezclando durante 2 minutos, sin que tome color.\n3- Incorporar la leche de a poco, batiendo para evitar grumos.\n4- Cocinar hasta que espese y tenga textura lisa.\n5- Condimentar con sal, pimienta blanca y nuez moscada.',
      cookingTime: 15,
      isFavorite: false,
    },
    {
      title: 'Salsa bolognesa',
      category: 'Salsas',
      description:
        'Salsa de carne cocida lentamente con vegetales, tomate y vino. Perfecta para pastas rellenas o largas.',
      ingredients:
        'Carne picada: 500 g\nCebolla: 1 u\nZanahoria: 1 u\nApio: 1 rama\nAjo: 1 diente\nTomate triturado: 500 ml\nVino tinto: 100 ml\nAceite de oliva: a gusto\nSal fina: a gusto\nPimienta: a gusto',
      steps:
        '1- Picar cebolla, zanahoria, apio y ajo bien pequeños.\n2- Rehogar los vegetales con aceite de oliva hasta que estén tiernos.\n3- Agregar la carne picada y dorar mezclando.\n4- Incorporar el vino y dejar evaporar el alcohol.\n5- Sumar el tomate triturado y cocinar a fuego bajo hasta concentrar.\n6- Ajustar sal y pimienta antes de servir.',
      cookingTime: 70,
      isFavorite: false,
    },
    {
      title: 'Pesto genovés',
      category: 'Salsas',
      description:
        'Salsa fresca de albahaca, ajo, queso, frutos secos y aceite de oliva. Rápida, aromática y versátil.',
      ingredients:
        'Albahaca fresca: 2 tazas\nAjo: 1 diente\nPiñones o nueces: 40 g\nQueso parmesano rallado: 60 g\nAceite de oliva: 120 ml\nSal fina: a gusto',
      steps:
        '1- Lavar y secar muy bien las hojas de albahaca.\n2- Procesar o machacar albahaca, ajo, frutos secos y sal.\n3- Agregar el queso rallado.\n4- Incorporar el aceite de oliva de a poco hasta obtener una salsa cremosa.\n5- Ajustar sal y usar sin calentar para conservar el color y aroma.',
      cookingTime: 10,
      isFavorite: false,
    },
    {
      title: 'Salsa holandesa',
      category: 'Salsas',
      description:
        'Emulsión tibia de yemas, manteca y limón. Clásica para huevos, pescados, vegetales y preparaciones delicadas.',
      ingredients:
        'Yemas: 3 u\nManteca clarificada o derretida: 180 g\nJugo de limón: 1 cda\nAgua: 1 cda\nSal fina: a gusto\nPimienta blanca: a gusto',
      steps:
        '1- Colocar las yemas con agua en un bowl resistente al calor.\n2- Batir sobre baño María suave hasta que espumen y espesen.\n3- Agregar la manteca tibia en forma de hilo, batiendo constantemente.\n4- Retirar del calor y sumar jugo de limón.\n5- Condimentar con sal y pimienta blanca. Mantener tibia, sin hervir.',
      cookingTime: 15,
      isFavorite: false,
    },
  ]),
};
