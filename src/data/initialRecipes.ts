import { Recipe } from '../types/recipe';

const createdAt = new Date().toISOString();

type RecipeTemplate = Omit<
  Recipe,
  'id' | 'userId' | 'isFavorite' | 'createdAt'
> & {
  templateId: string;
};

const recipeTemplates: RecipeTemplate[] = [
  {
    templateId: 'chaufan',
    title: 'Chau fan',
    category: 'Arroces',
    description:
      'Arroz salteado estilo cantonés con pollo, cerdo, vegetales, huevo revuelto y camarones opcionales.',
    ingredients:
      'Arroz largo fino cocido: 500 g\nAceite de maní: 20 ml\nHuevos: 2 u\nPollo cocido: 150 g\nCarne de cerdo cocida: 100 g\nCebolla de verdeo: 150 g\nCamarones: 60 g\nSal fina: a gusto\nPimienta blanca: a gusto\nAjí no moto: opcional',
    steps:
      '1- Cocinar el arroz previamente y dejarlo enfriar para que pierda humedad.\n2- Batir los huevos y cocinarlos como revuelto; reservar.\n3- Cortar el pollo, el cerdo y la cebolla de verdeo en trozos pequeños.\n4- Calentar un wok o sartén amplia con aceite.\n5- Saltear las carnes y los camarones durante unos minutos.\n6- Agregar el arroz frío y saltear a fuego fuerte.\n7- Incorporar el huevo revuelto y la cebolla de verdeo.\n8- Condimentar con sal, pimienta blanca y ají no moto si se desea.',
    cookingTime: 25,
    imageSource: require('../assets/recipes/chaufan.jpg'),
  },
  {
    templateId: 'goulash',
    title: 'Goulash con spätzle',
    category: 'Carnes',
    description:
      'Estofado de carne tierno con cebolla, morrón y páprika, acompañado con pequeños spätzle caseros.',
    ingredients:
      'Roast beef: 2 kg\nCebolla: 2 kg\nMorrón rojo: 200 g\nAceite: 50 ml\nPáprika: a gusto\nSal fina: a gusto\nPimienta blanca: a gusto\nHarina 0000: 500 g\nHuevos: 4 u\nLeche: 100 ml\nAgua con gas: 100 ml\nNuez moscada: a gusto',
    steps:
      '1- Cortar la carne en cubos y dorarla en aceite caliente.\n2- Retirar la carne y reservar.\n3- En el mismo recipiente, sudar la cebolla y el morrón.\n4- Volver a incorporar la carne.\n5- Condimentar con sal, pimienta y páprika.\n6- Cocinar tapado a fuego bajo hasta que la carne quede tierna.\n7- Para los spätzle, mezclar harina, huevos, leche, agua con gas, sal y nuez moscada.\n8- Cocinar pequeñas porciones de masa en agua caliente con sal.\n9- Servir el goulash junto con los spätzle.',
    cookingTime: 100,
    imageSource: require('../assets/recipes/goulash.jpg'),
  },
  {
    templateId: 'vitel',
    title: 'Vitel toné',
    category: 'Entradas',
    description:
      'Plato frío clásico con peceto cocido, salsa cremosa de atún, anchoas, alcaparras y mayonesa.',
    ingredients:
      'Peceto: 1.5 kg\nPuerro: 200 g\nZanahoria: 200 g\nCebolla: 200 g\nApio: 100 g\nMayonesa: 250 g\nCrema de leche: 100 ml\nAtún al natural: 220 g\nAlcaparras: 100 g\nAnchoas: a gusto\nSal fina: a gusto\nVino blanco seco: opcional',
    steps:
      '1- Cocinar el peceto en caldo con puerro, zanahoria, cebolla y apio.\n2- Dejar enfriar la carne dentro del caldo para que conserve humedad.\n3- Cortar el peceto en láminas finas.\n4- Procesar mayonesa, crema, atún, anchoas y parte de las alcaparras.\n5- Ajustar la textura de la salsa con un poco de caldo si fuera necesario.\n6- Cubrir las láminas de carne con la salsa.\n7- Decorar con alcaparras y conservar en frío hasta servir.',
    cookingTime: 90,
    imageSource: require('../assets/recipes/vitel.jpg'),
  },
  {
    templateId: 'pastas',
    title: 'Pasta fresca casera',
    category: 'Pastas',
    description:
      'Masa básica de pasta fresca con harina, huevos, aceite de oliva y sal. Ideal para tallarines o ravioles.',
    ingredients:
      'Harina 0000: 1 kg\nHuevos: 9 u\nAceite de oliva: 50 ml\nSal fina: a gusto',
    steps:
      '1- Colocar la harina sobre la mesada y formar una corona.\n2- Agregar los huevos, el aceite de oliva y la sal en el centro.\n3- Integrar los ingredientes desde el centro hacia afuera.\n4- Amasar hasta obtener una masa lisa y firme.\n5- Envolver y dejar descansar.\n6- Estirar con palote o máquina.\n7- Cortar según el formato deseado.',
    cookingTime: 35,
    imageSource: require('../assets/recipes/pastas.jpg'),
  },
  {
    templateId: 'ensalada-caesar',
    title: 'Ensalada Caesar',
    category: 'Ensaladas',
    description:
      'Ensalada fresca con lechuga romana, croutons, queso parmesano y aderezo cremoso con anchoa.',
    ingredients:
      'Lechuga romana: 2 u\nCroutons: 300 g\nQueso parmesano: 200 g\nAjo: 1 diente\nAnchoas: 2 u\nMayonesa: 250 g\nCrema de leche: 100 ml\nMostaza de Dijon: 1 cda\nJugo de limón: 50 ml\nAceite de girasol: 75 ml\nSal fina: a gusto\nPimienta: a gusto',
    steps:
      '1- Lavar y secar bien la lechuga.\n2- Cortar la lechuga en trozos grandes.\n3- Procesar ajo, anchoas, mayonesa, crema, mostaza, jugo de limón y aceite.\n4- Condimentar la salsa con sal y pimienta.\n5- Mezclar la lechuga con el aderezo justo antes de servir.\n6- Agregar croutons y queso parmesano.',
    cookingTime: 20,
    imageSource: require('../assets/recipes/ensaladacesar.jpg'),
  },
  {
    templateId: 'sopa-cebolla',
    title: 'Sopa de cebollas gratinada',
    category: 'Sopas',
    description:
      'Sopa de cebollas cocida lentamente con fondo de ave, pan tostado y queso gratinado.',
    ingredients:
      'Cebolla: 800 g\nManteca: 100 g\nHarina 0000: 20 g\nFondo de ave: 2 l\nVino blanco: opcional\nQueso gruyere: 320 g\nPan baguette: 160 g\nSal fina: a gusto\nPimienta blanca: a gusto',
    steps:
      '1- Cortar la cebolla en rodajas finas.\n2- Cocinarla con manteca a fuego bajo hasta que quede tierna y apenas caramelizada.\n3- Agregar harina y cocinar unos minutos.\n4- Incorporar el fondo caliente y mezclar.\n5- Cocinar a fuego suave hasta concentrar sabor.\n6- Servir en recipientes aptos para horno.\n7- Cubrir con pan tostado y queso gruyere.\n8- Gratinar hasta dorar.',
    cookingTime: 60,
    imageSource: require('../assets/recipes/sopacebolla.jpg'),
  },
  {
    templateId: 'risotto',
    title: 'Risotto de vegetales asados',
    category: 'Arroces',
    description:
      'Risotto cremoso con vegetales asados, vino blanco, caldo caliente, manteca y queso parmesano.',
    ingredients:
      'Arroz carnaroli: 650 g\nMorrón rojo: 400 g\nChoclo: 20 unidades pequeñas\nCebolla: 150 g\nVino blanco seco: 150 ml\nFondo de ave: cantidad necesaria\nManteca: 80 g\nQueso parmesano: 100 g\nAzafrán: 1 cápsula\nAceite de oliva: a gusto\nSal fina: a gusto\nPimienta blanca: a gusto',
    steps:
      '1- Asar los morrones y el choclo con aceite de oliva.\n2- Pelar los morrones y procesar una parte con ajo para obtener un puré.\n3- Sudar la cebolla picada en aceite de oliva.\n4- Agregar el arroz y nacarar durante unos minutos.\n5- Desglasar con vino blanco.\n6- Incorporar caldo caliente de a poco, mezclando durante la cocción.\n7- Agregar el puré de morrón y el azafrán.\n8- Terminar con manteca fría y queso parmesano.\n9- Servir con los vegetales asados.',
    cookingTime: 40,
    imageSource: require('../assets/recipes/risotto.jpg'),
  },
  {
    templateId: 'flan',
    title: 'Flan al caramelo',
    category: 'Postres',
    description:
      'Flan clásico cocido a baño María, con base de leche, huevos, yemas y caramelo rubio.',
    ingredients:
      'Leche: 1 l\nAzúcar: 250 g\nHuevos: 6 u\nYemas: 4 u\nChaucha de vainilla: 1/2 u\nAzúcar para caramelo: 200 g\nAgua para caramelo: 60 ml\nJugo de limón: unas gotas',
    steps:
      '1- Calentar la leche con la vainilla y parte del azúcar.\n2- Mezclar huevos, yemas y el resto del azúcar sin batir en exceso.\n3- Unir ambas preparaciones y colar.\n4- Preparar un caramelo rubio con azúcar, agua y unas gotas de limón.\n5- Cubrir el molde con el caramelo.\n6- Volcar la mezcla del flan.\n7- Cocinar a baño María a horno bajo hasta que esté firme.\n8- Enfriar bien antes de desmoldar.',
    cookingTime: 75,
    imageSource: require('../assets/recipes/flan.jpg'),
  },
  {
    templateId: 'pollo-verdeo',
    title: 'Pollo al verdeo',
    category: 'Carnes',
    description:
      'Pollo salteado con cebolla de verdeo, vino blanco y fondo de ave, terminado a fuego suave.',
    ingredients:
      'Pollo: 1.5 kg\nCebolla de verdeo: 400 g\nAceite de oliva: a gusto\nVino blanco seco: 100 ml\nFondo de ave: 200 ml\nBouquet garni: 1 u\nSal fina: a gusto\nPimienta blanca: a gusto',
    steps:
      '1- Trozar el pollo en octavos.\n2- Salpimentar y sellar en una sartén caliente con aceite de oliva.\n3- Retirar el pollo y reservar.\n4- En el mismo recipiente, saltear la cebolla de verdeo.\n5- Desglasar con vino blanco y dejar evaporar el alcohol.\n6- Incorporar el fondo de ave y volver a sumar el pollo.\n7- Cocinar a fuego suave hasta que el pollo esté cocido y la salsa reduzca.',
    cookingTime: 50,
    imageSource: require('../assets/recipes/polloverdeo.jpg'),
  },
  {
    templateId: 'sorrentinos-calabaza',
    title: 'Sorrentinos de calabaza y queso',
    category: 'Pastas',
    description:
      'Pasta rellena casera con calabaza asada, ricota, muzzarella y un toque de nuez moscada.',
    ingredients:
      'Masa para pasta fresca: 1 kg\nCalabaza asada: 800 g\nRicota: 300 g\nMuzzarella: 250 g\nQueso rallado: 100 g\nNuez moscada: a gusto\nSal fina: a gusto\nPimienta blanca: a gusto',
    steps:
      '1- Asar la calabaza hasta que quede tierna y seca.\n2- Hacer un puré y dejarlo enfriar.\n3- Mezclar con ricota, muzzarella, queso rallado, sal, pimienta y nuez moscada.\n4- Estirar la masa de pasta fresca.\n5- Colocar el relleno en porciones y cerrar los sorrentinos.\n6- Cocinar en agua hirviendo con sal hasta que suban a la superficie.',
    cookingTime: 60,
    imageSource: require('../assets/recipes/sorrentinos.jpg'),
  },
  {
    templateId: 'tarta-acelga',
    title: 'Tarta de acelga y ricota',
    category: 'Tartas',
    description:
      'Tarta salada con acelga salteada, ricota, huevo y queso, ideal para preparar con anticipación.',
    ingredients:
      'Masa de tarta: 1 unidad\nAcelga cocida: 700 g\nRicota: 300 g\nHuevos: 3 u\nCebolla: 200 g\nQueso rallado: 80 g\nAceite de oliva: a gusto\nSal fina: a gusto\nPimienta: a gusto',
    steps:
      '1- Saltear la cebolla picada con aceite de oliva.\n2- Agregar la acelga cocida, bien escurrida y picada.\n3- Mezclar con ricota, huevos y queso rallado.\n4- Condimentar con sal y pimienta.\n5- Forrar una tartera con la masa.\n6- Rellenar y cocinar en horno medio hasta dorar.',
    cookingTime: 45,
    imageSource: require('../assets/recipes/tarta.jpg'),
  },
  {
    templateId: 'pastel-papa',
    title: 'Pastel de papa',
    category: 'Carnes',
    description:
      'Pastel clásico con carne picada especiada, puré de papa cremoso y gratinado al horno.',
    ingredients:
      'Carne picada: 800 g\nPapa: 1.5 kg\nCebolla: 300 g\nMorrón rojo: 150 g\nHuevos duros: 2 u\nLeche: 200 ml\nManteca: 80 g\nQueso rallado: 100 g\nSal fina: a gusto\nPimienta: a gusto\nPimentón: a gusto',
    steps:
      '1- Hervir las papas y preparar un puré con leche, manteca y sal.\n2- Saltear cebolla y morrón picados.\n3- Agregar la carne picada y cocinar hasta dorar.\n4- Condimentar con sal, pimienta y pimentón.\n5- Incorporar huevo duro picado.\n6- Colocar la carne en una fuente y cubrir con puré.\n7- Espolvorear queso rallado y gratinar.',
    cookingTime: 70,
    imageSource: require('../assets/recipes/pastelpapa.jpg'),
  },
  {
    templateId: 'hummus-clasico',
    title: 'Hummus clásico',
    category: 'Entradas',
    description:
      'Crema de garbanzos con tahini, limón, ajo y aceite de oliva. Ideal como entrada o acompañamiento.',
    ingredients:
      'Garbanzos cocidos: 500 g\nTahini: 80 g\nJugo de limón: 60 ml\nAjo: 1 diente\nAceite de oliva: 80 ml\nComino: a gusto\nSal fina: a gusto\nAgua fría: cantidad necesaria\nPimentón: opcional',
    steps:
      '1- Procesar los garbanzos cocidos con tahini, ajo, jugo de limón y sal.\n2- Agregar aceite de oliva en forma de hilo.\n3- Ajustar la textura con agua fría.\n4- Condimentar con comino.\n5- Servir con aceite de oliva y pimentón por encima.',
    cookingTime: 15,
    imageSource: require('../assets/recipes/hummus.jpg'),
  },
  {
    templateId: 'sopa-tomate',
    title: 'Sopa crema de tomate',
    category: 'Sopas',
    description:
      'Sopa cremosa de tomate con cebolla, ajo, caldo de verduras y albahaca fresca.',
    ingredients:
      'Tomates maduros: 1.2 kg\nCebolla: 200 g\nAjo: 2 dientes\nCaldo de verduras: 800 ml\nCrema de leche: 100 ml\nAceite de oliva: 40 ml\nAlbahaca fresca: a gusto\nSal fina: a gusto\nPimienta: a gusto',
    steps:
      '1- Cortar los tomates y la cebolla en trozos.\n2- Saltear cebolla y ajo con aceite de oliva.\n3- Agregar los tomates y cocinar hasta que suelten jugo.\n4- Incorporar caldo y cocinar a fuego medio.\n5- Procesar hasta obtener una crema lisa.\n6- Terminar con crema de leche y albahaca fresca.',
    cookingTime: 40,
    imageSource: require('../assets/recipes/sopatomate.jpg'),
  },
  {
    templateId: 'budin-pan-jengibre',
    title: 'Budín de pan al jengibre',
    category: 'Postres',
    description:
      'Postre húmedo de pan, leche, huevos, caramelo y jengibre, cocido a baño María.',
    ingredients:
      'Pan del día anterior: 500 g\nLeche: 1 l\nHuevos: 5 u\nAzúcar: 250 g\nJengibre rallado: 1 cdita\nRalladura de naranja: a gusto\nCaramelo: cantidad necesaria\nEsencia de vainilla: a gusto',
    steps:
      '1- Remojar el pan en leche hasta que se ablande.\n2- Procesar o desmenuzar la mezcla.\n3- Agregar huevos, azúcar, vainilla, jengibre y ralladura de naranja.\n4- Acaramelar un molde.\n5- Volcar la preparación.\n6- Cocinar a baño María hasta que esté firme.\n7- Enfriar antes de desmoldar.',
    cookingTime: 80,
    imageSource: require('../assets/recipes/budinpan.jpg'),
  },
];

const buildRecipesForUser = (
  userId: string,
  templateIds: string[],
  favoriteTemplateIds: string[],
): Recipe[] => {
  return templateIds.map((templateId) => {
    const template = recipeTemplates.find(
      (recipe) => recipe.templateId === templateId,
    );

    if (!template) {
      throw new Error(`No existe la receta base: ${templateId}`);
    }

    const { templateId: currentTemplateId, ...recipeData } = template;

    return {
      id: `${userId}-${currentTemplateId}`,
      userId,
      ...recipeData,
      isFavorite: favoriteTemplateIds.includes(currentTemplateId),
      createdAt,
    };
  });
};

const allRecipeIds = recipeTemplates.map((recipe) => recipe.templateId);

//le asigno recetas de inicio a cada usuario demo, para que al loguearse por primera vez ya tenga contenido para explorar y probar funcionalidades (foto, timer, favoritos, edición, etc)
export const initialRecipes: Recipe[] = [
  ...buildRecipesForUser('admin', allRecipeIds, [
    'chaufan',
    'vitel',
    'pastas',
    'risotto',
    'flan',
    'sorrentinos-calabaza',
    'pastel-papa',
  ]),

  ...buildRecipesForUser(
    'demo',
    [
      'pollo-verdeo',
      'flan',
      'vitel',
      'pastas',
      'ensalada-caesar',
      'sopa-cebolla',
      'risotto',
      'chaufan',
      'sorrentinos-calabaza',
      'pastel-papa',
    ],
    ['flan', 'vitel', 'risotto', 'sorrentinos-calabaza'],
  ),

  ...buildRecipesForUser(
    'usr1',
    [
      'chaufan',
      'pastas',
      'ensalada-caesar',
      'sopa-tomate',
      'sorrentinos-calabaza',
      'hummus-clasico',
    ],
    ['chaufan', 'sopa-tomate', 'hummus-clasico'],
  ),

  ...buildRecipesForUser(
    'usr2',
    [
      'goulash',
      'vitel',
      'risotto',
      'pollo-verdeo',
      'tarta-acelga',
      'budin-pan-jengibre',
    ],
    ['goulash', 'pollo-verdeo', 'budin-pan-jengibre'],
  ),
];

//cuando se crea un usuario nuevo, se le asignan estas recetas de inicio (sin favoritos)
export const createStarterRecipesForUser = (userId: string): Recipe[] => {
  const now = new Date().toISOString();

  return buildRecipesForUser(
    userId,
    [
      'pollo-verdeo',
      'flan',
      'vitel',
      'pastas',
      'sopa-tomate',
      'hummus-clasico',
    ],
    ['flan', 'hummus-clasico'],
  ).map((recipe) => ({
    ...recipe,
    id: `${userId}-starter-${recipe.id}`,
    createdAt: now,
  }));
};
