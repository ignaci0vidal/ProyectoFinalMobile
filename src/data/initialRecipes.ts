import { Recipe } from "../types/recipe";

const createdAt = new Date().toISOString();

export const initialRecipes: Recipe[] = [
  {
    id: "admin-1",
    userId: "admin",
    title: "Pastas caseras",
    category: "Pastas",
    description:
      "Pasta fresca casera, simple y rendidora, ideal para cortar a cuchillo o pasar por máquina.",
    ingredients:
      "Harina 0000: 1 kg\nHuevos: 8 u\nAceite: 2 cdas\nSal: 1 cdta\nAgua: cantidad necesaria",
    steps:
      "1- Formar una corona con la harina y la sal.\n2- Agregar los huevos y el aceite en el centro.\n3- Integrar de a poco hasta formar una masa firme.\n4- Amasar hasta que la masa quede lisa.\n5- Dejar descansar 30 minutos tapada.\n6- Estirar con harina y cortar la pasta.",
    cookingTime: 30,
    imageSource: require("../assets/recipes/pastas.jpg"),
    isFavorite: true,
    createdAt,
  },
  {
    id: "admin-2",
    userId: "admin",
    title: "Pollo al horno con papas",
    category: "Carnes",
    description:
      "Pollo al horno dorado con papas, cebolla y morrón. Una receta clásica para comida familiar.",
    ingredients:
      "Pollo: 1 u\nPapas: 1 kg\nCebolla: 2 u\nMorrón rojo: 1 u\nAceite: 3 cdas\nSal: a gusto\nPimienta: a gusto\nPimentón: 1 cdta",
    steps:
      "1- Cortar las papas, la cebolla y el morrón.\n2- Colocar los vegetales en una fuente aceitada.\n3- Condimentar el pollo con sal, pimienta y pimentón.\n4- Ubicar el pollo sobre los vegetales.\n5- Hornear a temperatura media hasta que esté dorado y cocido.\n6- Dejar reposar unos minutos antes de servir.",
    cookingTime: 60,
    imageSource: require("../assets/recipes/pollo-horno.jpg"),
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
      "Miga de pan: 300 g\nLeche: 1 l\nMiel: 100 g\nAzúcar: 200 g\nHuevos: 7 u\nJengibre rallado: 5 g\nEsencia de vainilla: 1 cdta\nRalladura de naranja: 1 u\nCaramelo: cantidad necesaria",
    steps:
      "1- Encamisar el molde con caramelo.\n2- Remojar la miga de pan en parte de la leche.\n3- Calentar el resto de la leche con miel, ralladura y jengibre.\n4- Mezclar los huevos con el azúcar.\n5- Integrar el pan remojado, la leche saborizada y los huevos.\n6- Perfumar con vainilla.\n7- Cocinar a baño María a 160°C hasta que esté firme.",
    cookingTime: 60,
    imageSource: require("../assets/recipes/budin-pan.jpg"),
    isFavorite: false,
    createdAt,
  },
  {
    id: "admin-4",
    userId: "admin",
    title: "Risotto de remolacha",
    category: "Arroces",
    description:
      "Risotto cremoso con remolacha, caldo, queso rallado y manteca fría para terminar.",
    ingredients:
      "Arroz carnaroli: 400 g\nRemolacha cocida: 300 g\nCaldo caliente: 1.2 l\nCebolla: 1 u\nVino blanco: 100 ml\nQueso rallado: 80 g\nManteca fría: 60 g\nAceite de oliva: 2 cdas\nSal: a gusto\nPimienta: a gusto",
    steps:
      "1- Procesar la remolacha cocida hasta obtener un puré liso.\n2- Sudar la cebolla picada con aceite de oliva.\n3- Agregar el arroz y nacarar durante 2 minutos.\n4- Desglasar con vino blanco.\n5- Incorporar caldo caliente de a poco, mezclando constantemente.\n6- A mitad de cocción, agregar el puré de remolacha.\n7- Terminar con manteca fría y queso rallado.",
    cookingTime: 35,
    imageSource: require("../assets/recipes/risotto-remolacha.jpg"),
    isFavorite: true,
    createdAt,
  },
  {
    id: "admin-5",
    userId: "admin",
    title: "Sopa paraguaya",
    category: "Horno",
    description:
      "Preparación tradicional con harina de maíz, cebolla rehogada, leche, huevos y queso.",
    ingredients:
      "Harina de maíz: 500 g\nCebolla: 3 u\nHuevos: 5 u\nLeche: 700 ml\nQueso cremoso: 400 g\nAceite: 80 ml\nSal: a gusto\nPimienta: a gusto",
    steps:
      "1- Cortar la cebolla y rehogarla hasta que esté tierna.\n2- Mezclar los huevos con la leche y el aceite.\n3- Agregar la harina de maíz de a poco.\n4- Incorporar la cebolla rehogada y el queso en cubos.\n5- Condimentar con sal y pimienta.\n6- Volcar en una fuente aceitada.\n7- Hornear hasta que la superficie esté dorada.",
    cookingTime: 40,
    imageSource: require("../assets/recipes/sopa-paraguaya.jpg"),
    isFavorite: false,
    createdAt,
  },
  {
    id: "admin-6",
    userId: "admin",
    title: "Ñoquis de papa",
    category: "Pastas",
    description:
      "Ñoquis caseros de papa, suaves y livianos, ideales para acompañar con salsa fileto o crema.",
    ingredients:
      "Papa: 1 kg\nHarina 0000: 300 g\nHuevo: 1 u\nSal: 1 cdta\nNuez moscada: a gusto\nQueso rallado: 40 g",
    steps:
      "1- Hervir las papas con cáscara hasta que estén tiernas.\n2- Pelarlas en caliente y pisarlas hasta obtener un puré seco.\n3- Agregar sal, nuez moscada, huevo y queso rallado.\n4- Incorporar la harina de a poco sin amasar de más.\n5- Formar cilindros y cortar los ñoquis.\n6- Hervir en agua con sal hasta que suban a la superficie.",
    cookingTime: 35,
    imageUri:
      "https://cdn0.recetasgratis.net/es/posts/5/0/3/noquis_de_papa_argentinos_55305_orig.jpg",
    isFavorite: true,
    createdAt,
  },
  {
    id: "admin-7",
    userId: "admin",
    title: "Tarta de calabaza y queso",
    category: "Tartas",
    description:
      "Tarta salada con calabaza asada, cebolla, queso y masa crocante.",
    ingredients:
      "Masa de tarta: 1 u\nCalabaza: 800 g\nCebolla: 2 u\nQueso cremoso: 250 g\nHuevos: 3 u\nQueso rallado: 50 g\nAceite: 2 cdas\nSal: a gusto\nPimienta: a gusto",
    steps:
      "1- Asar la calabaza hasta que quede tierna y concentrada.\n2- Rehogar la cebolla picada con aceite.\n3- Pisar la calabaza y mezclarla con la cebolla.\n4- Agregar huevos, queso rallado y queso cremoso en cubos.\n5- Condimentar con sal y pimienta.\n6- Colocar el relleno sobre la masa.\n7- Hornear hasta que la superficie esté firme y dorada.",
    cookingTime: 45,
    imageUri:
      "https://www.lasaltena.com.ar/wp-content/uploads/2020/03/Tarta-de-calabaza-y-queso_banner-400x196.png.webp",
    isFavorite: false,
    createdAt,
  },
  {
    id: "admin-8",
    userId: "admin",
    title: "Milanesas con puré",
    category: "Carnes",
    description:
      "Milanesas doradas con puré de papa cremoso, una comida clásica y rendidora.",
    ingredients:
      "Nalga o bola de lomo: 800 g\nHuevos: 3 u\nPan rallado: 500 g\nAjo: 2 dientes\nPerejil: 2 cdas\nPapa: 1 kg\nLeche: 250 ml\nManteca: 80 g\nSal: a gusto\nPimienta: a gusto",
    steps:
      "1- Batir los huevos con ajo, perejil, sal y pimienta.\n2- Pasar la carne por la mezcla de huevo.\n3- Empanar presionando bien para que adhiera.\n4- Cocinar las milanesas en horno o fritura hasta dorar.\n5- Hervir las papas hasta que estén tiernas.\n6- Pisarlas con leche caliente y manteca.\n7- Servir las milanesas con el puré.",
    cookingTime: 50,
    imageUri:
      "https://i.pinimg.com/736x/70/a1/b6/70a1b6ab5afb78645c0b7c4a49a745c4.jpg",
    isFavorite: false,
    createdAt,
  },
  {
    id: "admin-9",
    userId: "admin",
    title: "Flan casero",
    category: "Postres",
    description:
      "Flan clásico de huevos, leche y azúcar, cocido a baño María con caramelo.",
    ingredients:
      "Leche: 1 l\nHuevos: 8 u\nAzúcar: 250 g\nEsencia de vainilla: 1 cdta\nCaramelo: cantidad necesaria",
    steps:
      "1- Acaramelar el molde y dejar enfriar.\n2- Mezclar huevos, azúcar y vainilla sin batir en exceso.\n3- Agregar la leche y mezclar hasta integrar.\n4- Colar la preparación.\n5- Volcar en el molde acaramelado.\n6- Cocinar a baño María a horno bajo hasta que esté firme.\n7- Enfriar bien antes de desmoldar.",
    cookingTime: 75,
    imageUri:
      "https://www.ohmargott.com/content/uploads/2020/05/IMG_20181012_083038423_HDR_2.jpg",
    isFavorite: true,
    createdAt,
  },

  {
    id: "demo-1",
    userId: "demo",
    title: "Pastas caseras",
    category: "Pastas",
    description:
      "Pasta fresca casera, simple y rendidora, ideal para comenzar a usar miKitchen.",
    ingredients:
      "Harina 0000: 1 kg\nHuevos: 8 u\nAceite: 2 cdas\nSal: 1 cdta\nAgua: cantidad necesaria",
    steps:
      "1- Formar una corona con la harina y la sal.\n2- Agregar los huevos y el aceite en el centro.\n3- Integrar de a poco hasta formar una masa firme.\n4- Amasar hasta que la masa quede lisa.\n5- Dejar descansar 30 minutos tapada.\n6- Estirar con harina y cortar la pasta.",
    cookingTime: 30,
    imageSource: require("../assets/recipes/pastas.jpg"),
    isFavorite: true,
    createdAt,
  },
  {
    id: "demo-2",
    userId: "demo",
    title: "Pollo al horno con papas",
    category: "Carnes",
    description:
      "Pollo al horno dorado con papas, cebolla y morrón. Una receta simple para comidas familiares.",
    ingredients:
      "Pollo: 1 u\nPapas: 1 kg\nCebolla: 2 u\nMorrón rojo: 1 u\nAceite: 3 cdas\nSal: a gusto\nPimienta: a gusto\nPimentón: 1 cdta",
    steps:
      "1- Cortar las papas, la cebolla y el morrón.\n2- Colocar los vegetales en una fuente aceitada.\n3- Condimentar el pollo con sal, pimienta y pimentón.\n4- Ubicar el pollo sobre los vegetales.\n5- Hornear a temperatura media hasta que esté dorado y cocido.\n6- Dejar reposar unos minutos antes de servir.",
    cookingTime: 60,
    imageSource: require("../assets/recipes/pollo-horno.jpg"),
    isFavorite: false,
    createdAt,
  },
  {
    id: "demo-3",
    userId: "demo",
    title: "Budín de pan",
    category: "Postres",
    description: "Postre clásico con pan, leche, huevos y caramelo.",
    ingredients:
      "Pan: 300 g\nLeche: 1 l\nHuevos: 6 u\nAzúcar: 200 g\nEsencia de vainilla: 1 cdta\nCaramelo: cantidad necesaria",
    steps:
      "1- Remojar el pan en la leche.\n2- Mezclar huevos, azúcar y vainilla.\n3- Integrar con el pan remojado.\n4- Volcar en molde acaramelado.\n5- Cocinar a baño María hasta que esté firme.",
    cookingTime: 60,
    imageSource: require("../assets/recipes/budin-pan.jpg"),
    isFavorite: false,
    createdAt,
  },
  {
    id: "demo-4",
    userId: "demo",
    title: "Ñoquis de papa",
    category: "Pastas",
    description: "Ñoquis caseros suaves para acompañar con salsa simple.",
    ingredients:
      "Papa: 1 kg\nHarina 0000: 300 g\nHuevo: 1 u\nSal: 1 cdta\nNuez moscada: a gusto",
    steps:
      "1- Hervir las papas con cáscara.\n2- Pisarlas en caliente.\n3- Mezclar con huevo, sal y harina.\n4- Formar cilindros y cortar.\n5- Hervir hasta que suban a la superficie.",
    cookingTime: 35,
    imageUri:
      "https://cdn0.recetasgratis.net/es/posts/5/0/3/noquis_de_papa_argentinos_55305_orig.jpg",
    isFavorite: true,
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
      description:
        "Pasta fresca casera, simple y rendidora, ideal para comenzar tu recetario.",
      ingredients:
        "Harina 0000: 1 kg\nHuevos: 8 u\nAceite: 2 cdas\nSal: 1 cdta\nAgua: cantidad necesaria",
      steps:
        "1- Formar una corona con la harina y la sal.\n2- Agregar los huevos y el aceite en el centro.\n3- Integrar de a poco.\n4- Amasar hasta que la masa quede lisa.\n5- Dejar descansar 30 minutos.\n6- Estirar y cortar.",
      cookingTime: 30,
      imageSource: require("../assets/recipes/pastas.jpg"),
      isFavorite: true,
      createdAt: now,
    },
    {
      id: `${userId}-starter-2`,
      userId,
      title: "Pollo al horno con papas",
      category: "Carnes",
      description: "Pollo al horno dorado con papas y vegetales.",
      ingredients:
        "Pollo: 1 u\nPapas: 1 kg\nCebolla: 2 u\nMorrón rojo: 1 u\nAceite: 3 cdas\nSal: a gusto\nPimienta: a gusto",
      steps:
        "1- Cortar los vegetales.\n2- Condimentar el pollo.\n3- Colocar todo en una fuente.\n4- Hornear hasta que el pollo esté dorado y cocido.",
      cookingTime: 60,
      imageSource: require("../assets/recipes/pollo-horno.jpg"),
      isFavorite: false,
      createdAt: now,
    },
    {
      id: `${userId}-starter-3`,
      userId,
      title: "Budín de pan",
      category: "Postres",
      description: "Postre clásico con pan, leche, huevos y caramelo.",
      ingredients:
        "Pan: 300 g\nLeche: 1 l\nHuevos: 6 u\nAzúcar: 200 g\nEsencia de vainilla: 1 cdta\nCaramelo: cantidad necesaria",
      steps:
        "1- Remojar el pan en leche.\n2- Mezclar huevos, azúcar y vainilla.\n3- Integrar ambas preparaciones.\n4- Volcar en molde acaramelado.\n5- Cocinar a baño María.",
      cookingTime: 60,
      imageSource: require("../assets/recipes/budin-pan.jpg"),
      isFavorite: false,
      createdAt: now,
    },
  ];
};
