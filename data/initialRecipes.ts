import {Recipe} from '../types/recipe';

export const initialRecipes: Recipe[] = [
  {
    id: '1',
    title: 'Pastas caseras',
    category: 'Pastas',
    description: 'Receta base de pastas frescas para una comida simple.',
    ingredients: '1.000 g de harina\n8 huevos\nSal\nAceite\nAgua',
    steps:
      '1. Formar una corona con la harina y la sal.\n2. Agregar los huevos aceite y agua.\n3. Integrar desde el centro y comenzar a amasar hasta lograr una masa lisa.\n4. Dejar descansar por 30 minutos.\n5. Estirar con bastante harina y cortar con cuchillo.',
    cookingTime: 30,
    imageUri: undefined,
    isFavorite: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Pollo al horno',
    category: 'Carnes',
    description: 'Pollo al horno simple con vegetales.',
    ingredients: '1 pollo\nPapas\nCebolla\nMorrón\nSal\nPimienta',
    steps:
      '1. Cortar los vegetales en Juliana.\n2. Condimentar el pollo con sal&pimienta.\n3. Llevar al horno.\n4. Cocinar hasta dorar.',
    cookingTime: 45,
    imageUri: undefined,
    isFavorite: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: '3',
    title: 'Budín de pan al jengibre',
    category: 'Postres',
    description:
      'Budín de pan perfumado con jengibre, miel, ralladura de naranja y vainilla. Receta para 8 porciones.',
    ingredients:
      'Miga de pan: 300 g\nLeche: 1 l\nMiel: 100 g\nAzúcar: 200 g\nHuevos: 7 u\nJengibre: 5 g\nEsencia de vainilla: c/n\nRalladura de naranja: 1 u\n\nCaramelo:\nAzúcar: 200 g\nAgua: 60 cm3\nLimón: c/n',
    steps:
      '1. Encamisar el molde con el caramelo.\n2. Remojar durante un día la miga de pan en la leche.\n3. Escurrir la miga de pan.\n4. Hervir la leche con miel, la ralladura de naranja y la mitad del azúcar.\n5. Mezclar los huevos con la otra mitad del azúcar.\n6. Agregar el jengibre fresco.\n7. Incorporar y mezclar todos los ingredientes.\n8. Perfumar con esencia de vainilla.\n9. Llenar el molde con la mezcla.\n10. Cocinar en horno a baño María a 160°C.\n11. Enfriar.',
    cookingTime: 60,
    imageUri: undefined,
    isFavorite: false,
    createdAt: new Date().toISOString(),
  },
];