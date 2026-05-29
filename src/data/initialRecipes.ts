import { Recipe } from "../types/recipe";

const createdAt = new Date().toISOString();

export const initialRecipes: Recipe[] = [
  {
    id: "admin-1",
    userId: "admin",
    title: "Pastas caseras",
    category: "Pastas",
    description: "Receta base de pastas frescas para una comida simple.",
    ingredients: "1.000 g de harina\n8 huevos\nSal\nAceite\nAgua",
    steps:
      "1. Formar una corona con la harina y la sal.\n2. Agregar los huevos, aceite y agua.\n3. Integrar desde el centro y comenzar a amasar hasta lograr una masa lisa.\n4. Dejar descansar por 30 minutos.\n5. Estirar con bastante harina y cortar con cuchillo.",
    cookingTime: 30,
    imageUri: undefined,
    isFavorite: true,
    createdAt,
  },
  {
    id: "admin-2",
    userId: "admin",
    title: "Pollo al horno",
    category: "Carnes",
    description: "Pollo al horno simple con vegetales.",
    ingredients: "1 pollo\nPapas\nCebolla\nMorrón\nSal\nPimienta",
    steps:
      "1. Cortar los vegetales en juliana.\n2. Condimentar el pollo con sal y pimienta.\n3. Llevar al horno.\n4. Cocinar hasta dorar.",
    cookingTime: 45,
    imageUri: undefined,
    isFavorite: false,
    createdAt,
  },
  {
    id: "admin-3",
    userId: "admin",
    title: "Budín de pan al jengibre",
    category: "Postres",
    description:
      "Budín de pan perfumado con jengibre, miel, ralladura de naranja y vainilla.",
    ingredients:
      "Miga de pan: 300 g\nLeche: 1 l\nMiel: 100 g\nAzúcar: 200 g\nHuevos: 7 u\nJengibre: 5 g\nEsencia de vainilla\nRalladura de naranja",
    steps:
      "1. Encamisar el molde con caramelo.\n2. Remojar la miga de pan en leche.\n3. Hervir la leche con miel, ralladura y parte del azúcar.\n4. Mezclar huevos con el resto del azúcar.\n5. Incorporar todo y perfumar.\n6. Cocinar a baño María a 160°C.",
    cookingTime: 60,
    imageUri: undefined,
    isFavorite: false,
    createdAt,
  },
  {
    id: "admin-4",
    userId: "admin",
    title: "Risotto de remolacha",
    category: "Arroces",
    description: "Risotto cremoso con remolacha, queso y manteca fría.",
    ingredients:
      "Arroz carnaroli\nRemolacha cocida\nCaldo\nCebolla\nVino blanco\nQueso rallado\nManteca",
    steps:
      "1. Sudar la cebolla.\n2. Nacarar el arroz.\n3. Desglasar con vino blanco.\n4. Agregar caldo de a poco.\n5. Incorporar puré de remolacha.\n6. Terminar con manteca y queso.",
    cookingTime: 35,
    imageUri: undefined,
    isFavorite: true,
    createdAt,
  },
  {
    id: "admin-5",
    userId: "admin",
    title: "Sopa paraguaya",
    category: "Horno",
    description: "Preparación tradicional con harina de maíz, cebolla y queso.",
    ingredients: "Harina de maíz\nCebolla\nHuevos\nLeche\nQueso\nAceite\nSal",
    steps:
      "1. Rehogar la cebolla.\n2. Mezclar huevos, leche y harina de maíz.\n3. Agregar queso y cebolla.\n4. Llevar a fuente aceitada.\n5. Hornear hasta dorar.",
    cookingTime: 40,
    imageUri: undefined,
    isFavorite: false,
    createdAt,
  },

  {
    id: "demo-1",
    userId: "demo",
    title: "Pastas caseras",
    category: "Pastas",
    description: "Receta base gratuita para empezar a usar miKitchen.",
    ingredients: "Harina\nHuevos\nSal\nAceite",
    steps:
      "1. Formar la masa.\n2. Amasar.\n3. Dejar descansar.\n4. Estirar y cortar.",
    cookingTime: 30,
    imageUri: undefined,
    isFavorite: true,
    createdAt,
  },
  {
    id: "demo-2",
    userId: "demo",
    title: "Pollo al horno",
    category: "Carnes",
    description: "Receta simple gratuita para comidas familiares.",
    ingredients: "Pollo\nPapas\nCebolla\nCondimentos",
    steps:
      "1. Condimentar el pollo.\n2. Cortar vegetales.\n3. Hornear hasta dorar.",
    cookingTime: 45,
    imageUri: undefined,
    isFavorite: false,
    createdAt,
  },
  {
    id: "demo-3",
    userId: "demo",
    title: "Budín de pan",
    category: "Postres",
    description: "Postre clásico incluido en el paquete gratuito inicial.",
    ingredients: "Pan\nLeche\nHuevos\nAzúcar\nVainilla",
    steps:
      "1. Remojar el pan en leche.\n2. Mezclar con huevos y azúcar.\n3. Cocinar a baño María.",
    cookingTime: 60,
    imageUri: undefined,
    isFavorite: false,
    createdAt,
  },
];

export const createStarterRecipesForUser = (userId: string): Recipe[] => {
  const now = new Date().toISOString();

  return [
    {
      id: `${userId}-starter-1`,
      userId,
      title: "Pastas caseras",
      category: "Pastas",
      description: "Receta gratis inicial para comenzar tu recetario.",
      ingredients: "Harina\nHuevos\nSal\nAceite",
      steps:
        "1. Formar la masa.\n2. Amasar.\n3. Dejar descansar.\n4. Estirar y cortar.",
      cookingTime: 30,
      imageUri: undefined,
      isFavorite: true,
      createdAt: now,
    },
    {
      id: `${userId}-starter-2`,
      userId,
      title: "Pollo al horno",
      category: "Carnes",
      description: "Receta gratis inicial para comidas simples.",
      ingredients: "Pollo\nPapas\nCebolla\nCondimentos",
      steps:
        "1. Condimentar el pollo.\n2. Cortar vegetales.\n3. Llevar al horno.",
      cookingTime: 45,
      imageUri: undefined,
      isFavorite: false,
      createdAt: now,
    },
    {
      id: `${userId}-starter-3`,
      userId,
      title: "Budín de pan",
      category: "Postres",
      description: "Postre gratis inicial para completar tu recetario.",
      ingredients: "Pan\nLeche\nHuevos\nAzúcar\nVainilla",
      steps:
        "1. Remojar el pan.\n2. Mezclar con huevos, leche y azúcar.\n3. Cocinar a baño María.",
      cookingTime: 60,
      imageUri: undefined,
      isFavorite: false,
      createdAt: now,
    },
  ];
};
