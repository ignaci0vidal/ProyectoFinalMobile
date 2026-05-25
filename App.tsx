import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as Haptics from 'expo-haptics';
import * as ImagePicker from 'expo-image-picker';
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  Alert,
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

type Recipe = {
  id: string;
  title: string;
  category: string;
  description: string;
  ingredients: string;
  steps: string;
  cookingTime: number;
  imageUri?: string;
  isFavorite: boolean;
  createdAt: string;
};

type RootTabParamList = {
  Inicio: undefined;
  Recetas: undefined;
  Nueva: undefined;
  Categorias: undefined;
  Ajustes: undefined;
};

type RecipeStackParamList = {
  RecipeList: undefined;
  RecipeDetail: { recipeId: string };
  RecipeEdit: { recipeId: string };
};

type RecipesContextType = {
  recipes: Recipe[];
  addRecipe: (recipe: Omit<Recipe, 'id' | 'createdAt'>) => void;
  updateRecipe: (recipeId: string, data: Omit<Recipe, 'id' | 'createdAt'>) => void;
  deleteRecipe: (recipeId: string) => void;
  toggleFavorite: (recipeId: string) => void;
};

const RecipesContext = createContext<RecipesContextType | null>(null);

const useRecipes = () => {
  const context = useContext(RecipesContext);

  if (!context) {
    throw new Error('useRecipes debe usarse dentro de RecipesProvider');
  }

  return context;
};

const Tab = createBottomTabNavigator<RootTabParamList>();
const RecipeStack = createNativeStackNavigator<RecipeStackParamList>();

const initialRecipes: Recipe[] = [
  {
    id: '1',
    title: 'Pastas caseras',
    category: 'Pastas',
    description: 'Receta base de pastas frescas para una comida simple.',
    ingredients: '500 g de harina\n5 huevos\nSal\nAceite de oliva',
    steps:
      '1. Formar una corona con la harina.\n2. Agregar los huevos.\n3. Amasar hasta lograr una masa lisa.\n4. Descansar 30 minutos.\n5. Estirar y cortar.',
    cookingTime: 12,
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
      '1. Cortar los vegetales.\n2. Condimentar el pollo.\n3. Llevar al horno.\n4. Cocinar hasta dorar.',
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

const App: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>(initialRecipes);

  const addRecipe = async (recipe: Omit<Recipe, 'id' | 'createdAt'>) => {
    const newRecipe: Recipe = {
      ...recipe,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };

    setRecipes((prev) => [newRecipe, ...prev]);
    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  };

  const updateRecipe = async (
    recipeId: string,
    data: Omit<Recipe, 'id' | 'createdAt'>
  ) => {
    setRecipes((prev) =>
      prev.map((recipe) =>
        recipe.id === recipeId
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
    setRecipes((prev) => prev.filter((recipe) => recipe.id !== recipeId));
    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
  };

  const toggleFavorite = async (recipeId: string) => {
    setRecipes((prev) =>
      prev.map((recipe) =>
        recipe.id === recipeId
          ? {
              ...recipe,
              isFavorite: !recipe.isFavorite,
            }
          : recipe
      )
    );

    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  const contextValue = useMemo(
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
    <RecipesContext.Provider value={contextValue}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            headerShown: false,
            tabBarActiveTintColor: '#e76f51',
            tabBarInactiveTintColor: '#777',
            tabBarLabelStyle: styles.tabLabel,
            tabBarStyle: styles.tabBar,
            tabBarIcon: ({ color, size }) => {
              let iconName: keyof typeof Ionicons.glyphMap = 'help-circle-outline';

              if (route.name === 'Inicio') iconName = 'home-outline';
              if (route.name === 'Recetas') iconName = 'restaurant-outline';
              if (route.name === 'Nueva') iconName = 'add-circle-outline';
              if (route.name === 'Categorias') iconName = 'grid-outline';
              if (route.name === 'Ajustes') iconName = 'settings-outline';

              return <Ionicons name={iconName} size={size} color={color} />;
            },
          })}
        >
          <Tab.Screen name="Inicio" component={HomeScreen} />
          <Tab.Screen name="Recetas" component={RecipesStackScreen} />
          <Tab.Screen name="Nueva" component={CreateRecipeScreen} />
          <Tab.Screen name="Categorias" component={CategoriesScreen} />
          <Tab.Screen name="Ajustes" component={SettingsScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </RecipesContext.Provider>
  );
};

const RecipesStackScreen: React.FC = () => {
  return (
    <RecipeStack.Navigator>
      <RecipeStack.Screen
        name="RecipeList"
        component={RecipeListScreen}
        options={{ title: 'Recetas' }}
      />
      <RecipeStack.Screen
        name="RecipeDetail"
        component={RecipeDetailScreen}
        options={{ title: 'Detalle de receta' }}
      />
      <RecipeStack.Screen
        name="RecipeEdit"
        component={RecipeEditScreen}
        options={{ title: 'Editar receta' }}
      />
    </RecipeStack.Navigator>
  );
};

const HomeScreen: React.FC = () => {
  const { recipes } = useRecipes();

  const totalRecipes = recipes.length;
  const favoriteRecipes = recipes.filter((recipe) => recipe.isFavorite).length;
  const categories = new Set(recipes.map((recipe) => recipe.category)).size;

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.header}>
        <Text style={styles.appName}>miKitchen</Text>
        <Text style={styles.subtitle}>
          Tu recetario personal con foto, pasos y timer de cocción.
        </Text>
      </View>

      <View style={styles.summaryContainer}>
        <SummaryCard label="Recetas" value={totalRecipes.toString()} />
        <SummaryCard label="Favoritas" value={favoriteRecipes.toString()} />
        <SummaryCard label="Categorías" value={categories.toString()} />
      </View>

      <View style={styles.infoBox}>
        <Text style={styles.infoTitle}>Objetivo de la app</Text>
        <Text style={styles.infoText}>
          Guardar recetas propias, organizarlas por categoría, documentarlas con
          foto y usar un timer simple durante la cocción.
        </Text>
      </View>

      <View style={styles.infoBox}>
        <Text style={styles.infoTitle}>Elementos nativos incluidos</Text>
        <Text style={styles.infoText}>• Cámara o galería para foto de receta</Text>
        <Text style={styles.infoText}>• Feedback háptico al guardar acciones</Text>
        <Text style={styles.infoText}>• Timer de cocción con alerta</Text>
      </View>
    </SafeAreaView>
  );
};

const SummaryCard: React.FC<{ label: string; value: string }> = ({
  label,
  value,
}) => {
  return (
    <View style={styles.summaryCard}>
      <Text style={styles.summaryValue}>{value}</Text>
      <Text style={styles.summaryLabel}>{label}</Text>
    </View>
  );
};

type RecipeListProps = NativeStackScreenProps<
  RecipeStackParamList,
  'RecipeList'
>;

const RecipeListScreen: React.FC<RecipeListProps> = ({ navigation }) => {
  const { recipes } = useRecipes();

  return (
    <SafeAreaView style={styles.screen}>
      <Text style={styles.screenTitle}>Mis recetas</Text>

      <FlatList
        data={recipes}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <EmptyState message="Todavía no hay recetas cargadas." />
        }
        renderItem={({ item }) => (
          <RecipeCard
            recipe={item}
            onPress={() =>
              navigation.navigate('RecipeDetail', { recipeId: item.id })
            }
          />
        )}
      />
    </SafeAreaView>
  );
};

type RecipeDetailProps = NativeStackScreenProps<
  RecipeStackParamList,
  'RecipeDetail'
>;

const RecipeDetailScreen: React.FC<RecipeDetailProps> = ({
  route,
  navigation,
}) => {
  const { recipes, deleteRecipe, toggleFavorite } = useRecipes();
  const recipe = recipes.find((item) => item.id === route.params.recipeId);

  const [secondsLeft, setSecondsLeft] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);

  useEffect(() => {
    if (!timerRunning) return;

    if (secondsLeft <= 0) {
      setTimerRunning(false);
      return;
    }

    const intervalId: ReturnType<typeof setInterval> = setInterval(() => {
      setSecondsLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timerRunning, secondsLeft]);

  useEffect(() => {
    if (secondsLeft === 0 && timerRunning) {
      setTimerRunning(false);
    }
  }, [secondsLeft, timerRunning]);

  if (!recipe) {
    return (
      <SafeAreaView style={styles.screen}>
        <EmptyState message="No se encontró la receta." />
      </SafeAreaView>
    );
  }

  const startTimer = () => {
    const totalSeconds = recipe.cookingTime * 60;

    if (totalSeconds <= 0) {
      Alert.alert('Timer no disponible', 'La receta no tiene tiempo válido.');
      return;
    }

    setSecondsLeft(totalSeconds);
    setTimerRunning(true);
  };

  const stopTimer = () => {
    setTimerRunning(false);
    setSecondsLeft(0);
  };

  const confirmDelete = () => {
    Alert.alert(
      'Eliminar receta',
      `¿Seguro que querés eliminar "${recipe.title}"?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: () => {
            deleteRecipe(recipe.id);
            navigation.goBack();
          },
        },
      ]
    );
  };

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;

  if (secondsLeft === 0 && !timerRunning) {
    // No hacemos nada automático acá para evitar alerts repetidos en render.
  }

  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView contentContainerStyle={styles.detailContent}>
        {recipe.imageUri ? (
          <Image source={{ uri: recipe.imageUri }} style={styles.detailImage} />
        ) : (
          <View style={styles.imagePlaceholder}>
            <Ionicons name="image-outline" size={42} color="#999" />
            <Text style={styles.placeholderText}>Sin foto</Text>
          </View>
        )}

        <View style={styles.detailHeader}>
          <View style={styles.detailTitleBox}>
            <Text style={styles.detailTitle}>{recipe.title}</Text>
            <Text style={styles.categoryText}>{recipe.category}</Text>
          </View>

          <TouchableOpacity onPress={() => toggleFavorite(recipe.id)}>
            <Ionicons
              name={recipe.isFavorite ? 'heart' : 'heart-outline'}
              size={30}
              color={recipe.isFavorite ? '#e63946' : '#555'}
            />
          </TouchableOpacity>
        </View>

        <Text style={styles.description}>{recipe.description}</Text>

        <Section title="Ingredientes" content={recipe.ingredients} />
        <Section title="Pasos" content={recipe.steps} />

        <View style={styles.timerBox}>
          <Text style={styles.timerTitle}>Timer de cocción</Text>
          <Text style={styles.timerText}>
            Tiempo sugerido: {recipe.cookingTime} minutos
          </Text>

          {timerRunning && (
            <Text style={styles.timerCounter}>
              {String(minutes).padStart(2, '0')}:
              {String(seconds).padStart(2, '0')}
            </Text>
          )}

          {!timerRunning ? (
            <PrimaryButton label="Iniciar timer" onPress={startTimer} />
          ) : (
            <PrimaryButton label="Detener timer" onPress={stopTimer} danger />
          )}
        </View>

        <View style={styles.actionsRow}>
          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={() =>
              navigation.navigate('RecipeEdit', { recipeId: recipe.id })
            }
          >
            <Text style={styles.secondaryButtonText}>Editar</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.dangerButton} onPress={confirmDelete}>
            <Text style={styles.dangerButtonText}>Eliminar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const Section: React.FC<{ title: string; content: string }> = ({
  title,
  content,
}) => {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <Text style={styles.sectionContent}>{content}</Text>
    </View>
  );
};

const CreateRecipeScreen: React.FC = () => {
  return <RecipeFormScreen mode="create" />;
};

type RecipeEditProps = NativeStackScreenProps<
  RecipeStackParamList,
  'RecipeEdit'
>;

const RecipeEditScreen: React.FC<RecipeEditProps> = ({ route, navigation }) => {
  return (
    <RecipeFormScreen
      mode="edit"
      recipeId={route.params.recipeId}
      onSaved={() => navigation.goBack()}
    />
  );
};

type RecipeFormProps = {
  mode: 'create' | 'edit';
  recipeId?: string;
  onSaved?: () => void;
};

const RecipeFormScreen: React.FC<RecipeFormProps> = ({
  mode,
  recipeId,
  onSaved,
}) => {
  const { recipes, addRecipe, updateRecipe } = useRecipes();

  const recipeToEdit = recipes.find((recipe) => recipe.id === recipeId);

  const [title, setTitle] = useState(recipeToEdit?.title ?? '');
  const [category, setCategory] = useState(recipeToEdit?.category ?? '');
  const [description, setDescription] = useState(recipeToEdit?.description ?? '');
  const [ingredients, setIngredients] = useState(recipeToEdit?.ingredients ?? '');
  const [steps, setSteps] = useState(recipeToEdit?.steps ?? '');
  const [cookingTime, setCookingTime] = useState(
    recipeToEdit?.cookingTime ? recipeToEdit.cookingTime.toString() : ''
  );
  const [imageUri, setImageUri] = useState<string | undefined>(
    recipeToEdit?.imageUri
  );

  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      Alert.alert(
        'Permiso requerido',
        'Necesitás permitir acceso a la galería para elegir una foto.'
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 0.7,
      aspect: [4, 3],
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const validateForm = () => {
    if (!title.trim()) return 'El título es obligatorio.';
    if (!category.trim()) return 'La categoría es obligatoria.';
    if (!ingredients.trim()) return 'Los ingredientes son obligatorios.';
    if (!steps.trim()) return 'Los pasos son obligatorios.';

    const parsedTime = Number(cookingTime);

    if (Number.isNaN(parsedTime) || parsedTime <= 0) {
      return 'El tiempo de cocción debe ser un número mayor a 0.';
    }

    return null;
  };

  const handleSave = () => {
    const error = validateForm();

    if (error) {
      Alert.alert('Revisá el formulario', error);
      return;
    }

    const recipeData = {
      title: title.trim(),
      category: category.trim(),
      description: description.trim(),
      ingredients: ingredients.trim(),
      steps: steps.trim(),
      cookingTime: Number(cookingTime),
      imageUri,
      isFavorite: recipeToEdit?.isFavorite ?? false,
    };

    if (mode === 'create') {
      addRecipe(recipeData);
      clearForm();
      Alert.alert('Receta guardada', 'La receta fue agregada correctamente.');
      return;
    }

    if (recipeId) {
      updateRecipe(recipeId, recipeData);
      Alert.alert('Receta actualizada', 'Los cambios fueron guardados.');
      onSaved?.();
    }
  };

  const clearForm = () => {
    setTitle('');
    setCategory('');
    setDescription('');
    setIngredients('');
    setSteps('');
    setCookingTime('');
    setImageUri(undefined);
  };

  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView contentContainerStyle={styles.formContent}>
        <Text style={styles.screenTitle}>
          {mode === 'create' ? 'Nueva receta' : 'Editar receta'}
        </Text>

        <FormInput
          label="Título"
          value={title}
          onChangeText={setTitle}
          placeholder="Ej: Tarta de verduras"
        />

        <FormInput
          label="Categoría"
          value={category}
          onChangeText={setCategory}
          placeholder="Ej: Pastas, Carnes, Postres"
        />

        <FormInput
          label="Descripción"
          value={description}
          onChangeText={setDescription}
          placeholder="Breve descripción de la receta"
          multiline
        />

        <FormInput
          label="Ingredientes"
          value={ingredients}
          onChangeText={setIngredients}
          placeholder="Un ingrediente por línea"
          multiline
        />

        <FormInput
          label="Pasos"
          value={steps}
          onChangeText={setSteps}
          placeholder="Paso 1..., Paso 2..."
          multiline
        />

        <FormInput
          label="Tiempo de cocción en minutos"
          value={cookingTime}
          onChangeText={setCookingTime}
          placeholder="Ej: 30"
          keyboardType="numeric"
        />

        <View style={styles.photoBox}>
          <Text style={styles.inputLabel}>Foto de la receta</Text>

          {imageUri ? (
            <Image source={{ uri: imageUri }} style={styles.formImage} />
          ) : (
            <View style={styles.formImagePlaceholder}>
              <Ionicons name="camera-outline" size={36} color="#999" />
              <Text style={styles.placeholderText}>Sin imagen seleccionada</Text>
            </View>
          )}

          <PrimaryButton label="Elegir foto de galería" onPress={pickImage} />
        </View>

        <PrimaryButton
          label={mode === 'create' ? 'Guardar receta' : 'Guardar cambios'}
          onPress={handleSave}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const CategoriesScreen: React.FC = () => {
  const { recipes } = useRecipes();

  const categories = Array.from(
    new Set(recipes.map((recipe) => recipe.category))
  );

  return (
    <SafeAreaView style={styles.screen}>
      <Text style={styles.screenTitle}>Categorías</Text>

      {categories.length === 0 ? (
        <EmptyState message="Todavía no hay categorías." />
      ) : (
        categories.map((category) => {
          const total = recipes.filter(
            (recipe) => recipe.category === category
          ).length;

          return (
            <View key={category} style={styles.categoryCard}>
              <Text style={styles.categoryCardTitle}>{category}</Text>
              <Text style={styles.categoryCardText}>
                {total} receta{total !== 1 ? 's' : ''}
              </Text>
            </View>
          );
        })
      )}
    </SafeAreaView>
  );
};

const SettingsScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.screen}>
      <Text style={styles.screenTitle}>Ajustes</Text>

      <View style={styles.infoBox}>
        <Text style={styles.infoTitle}>miKitchen</Text>
        <Text style={styles.infoText}>
          Aplicación desarrollada como Trabajo Práctico Integrador de Desarrollo
          de Aplicaciones para Dispositivos Móviles.
        </Text>
      </View>

      <View style={styles.infoBox}>
        <Text style={styles.infoTitle}>Tecnologías</Text>
        <Text style={styles.infoText}>• React Native</Text>
        <Text style={styles.infoText}>• Expo</Text>
        <Text style={styles.infoText}>• TypeScript</Text>
        <Text style={styles.infoText}>• React Navigation</Text>
      </View>
    </SafeAreaView>
  );
};

const RecipeCard: React.FC<{ recipe: Recipe; onPress: () => void }> = ({
  recipe,
  onPress,
}) => {
  return (
    <TouchableOpacity style={styles.recipeCard} onPress={onPress}>
      {recipe.imageUri ? (
        <Image source={{ uri: recipe.imageUri }} style={styles.cardImage} />
      ) : (
        <View style={styles.cardImagePlaceholder}>
          <Ionicons name="restaurant-outline" size={28} color="#999" />
        </View>
      )}

      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{recipe.title}</Text>
        <Text style={styles.cardCategory}>{recipe.category}</Text>
        <Text style={styles.cardDescription} numberOfLines={2}>
          {recipe.description || 'Sin descripción'}
        </Text>
        <Text style={styles.cardTime}>{recipe.cookingTime} min</Text>
      </View>

      {recipe.isFavorite && (
        <Ionicons name="heart" size={22} color="#e63946" />
      )}
    </TouchableOpacity>
  );
};

const FormInput: React.FC<{
  label: string;
  value: string;
  onChangeText: (value: string) => void;
  placeholder: string;
  multiline?: boolean;
  keyboardType?: 'default' | 'numeric';
}> = ({
  label,
  value,
  onChangeText,
  placeholder,
  multiline = false,
  keyboardType = 'default',
}) => {
  return (
    <View style={styles.inputGroup}>
      <Text style={styles.inputLabel}>{label}</Text>
      <TextInput
        style={[styles.input, multiline && styles.inputMultiline]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        multiline={multiline}
        keyboardType={keyboardType}
      />
    </View>
  );
};

const PrimaryButton: React.FC<{
  label: string;
  onPress: () => void;
  danger?: boolean;
}> = ({ label, onPress, danger = false }) => {
  return (
    <TouchableOpacity
      style={[styles.primaryButton, danger && styles.primaryButtonDanger]}
      onPress={onPress}
    >
      <Text style={styles.primaryButtonText}>{label}</Text>
    </TouchableOpacity>
  );
};

const EmptyState: React.FC<{ message: string }> = ({ message }) => {
  return (
    <View style={styles.emptyState}>
      <Ionicons name="file-tray-outline" size={42} color="#999" />
      <Text style={styles.emptyText}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    height: 62,
    paddingTop: 6,
    paddingBottom: 8,
  },
  tabLabel: {
    fontSize: 11,
    fontWeight: '600',
  },
  screen: {
    flex: 1,
    backgroundColor: '#fff8f0',
    padding: 16,
  },
  header: {
    marginTop: 16,
    marginBottom: 24,
  },
  appName: {
    fontSize: 34,
    fontWeight: '800',
    color: '#2b2d42',
  },
  subtitle: {
    marginTop: 8,
    fontSize: 16,
    lineHeight: 22,
    color: '#555',
  },
  screenTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: '#2b2d42',
    marginBottom: 16,
  },
  summaryContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  summaryCard: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 14,
    borderRadius: 16,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#f0dfd2',
  },
  summaryValue: {
    fontSize: 24,
    fontWeight: '800',
    color: '#e76f51',
  },
  summaryLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  infoBox: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#f0dfd2',
  },
  infoTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#2b2d42',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 15,
    color: '#555',
    lineHeight: 21,
  },
  listContent: {
    paddingBottom: 24,
  },
  recipeCard: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 18,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#f0dfd2',
    alignItems: 'center',
  },
  cardImage: {
    width: 72,
    height: 72,
    borderRadius: 14,
    marginRight: 12,
  },
  cardImagePlaceholder: {
    width: 72,
    height: 72,
    borderRadius: 14,
    marginRight: 12,
    backgroundColor: '#f4ece4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: '#2b2d42',
  },
  cardCategory: {
    fontSize: 13,
    color: '#e76f51',
    fontWeight: '700',
    marginTop: 2,
  },
  cardDescription: {
    fontSize: 13,
    color: '#666',
    marginTop: 4,
  },
  cardTime: {
    marginTop: 6,
    fontSize: 12,
    color: '#555',
    fontWeight: '700',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 48,
  },
  emptyText: {
    marginTop: 8,
    fontSize: 15,
    color: '#777',
    textAlign: 'center',
  },
  detailContent: {
    paddingBottom: 32,
  },
  detailImage: {
    width: '100%',
    height: 220,
    borderRadius: 20,
    marginBottom: 16,
  },
  imagePlaceholder: {
    width: '100%',
    height: 220,
    borderRadius: 20,
    marginBottom: 16,
    backgroundColor: '#f4ece4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderText: {
    marginTop: 6,
    color: '#777',
  },
  detailHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  detailTitleBox: {
    flex: 1,
  },
  detailTitle: {
    fontSize: 28,
    fontWeight: '900',
    color: '#2b2d42',
  },
  categoryText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#e76f51',
    marginTop: 4,
  },
  description: {
    fontSize: 15,
    color: '#555',
    lineHeight: 22,
    marginBottom: 16,
  },
  section: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#f0dfd2',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#2b2d42',
    marginBottom: 8,
  },
  sectionContent: {
    fontSize: 15,
    color: '#555',
    lineHeight: 22,
  },
  timerBox: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#f0dfd2',
  },
  timerTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#2b2d42',
  },
  timerText: {
    marginTop: 6,
    fontSize: 15,
    color: '#555',
  },
  timerCounter: {
    fontSize: 36,
    fontWeight: '900',
    color: '#e76f51',
    textAlign: 'center',
    marginVertical: 14,
  },
  actionsRow: {
    flexDirection: 'row',
    marginTop: 4,
  },
  secondaryButton: {
    flex: 1,
    backgroundColor: '#2b2d42',
    padding: 14,
    borderRadius: 14,
    alignItems: 'center',
    marginRight: 8,
  },
  secondaryButtonText: {
    color: '#ffffff',
    fontWeight: '800',
  },
  dangerButton: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e63946',
  },
  dangerButtonText: {
    color: '#e63946',
    fontWeight: '800',
  },
  formContent: {
    paddingBottom: 32,
  },
  inputGroup: {
    marginBottom: 14,
  },
  inputLabel: {
    fontSize: 15,
    fontWeight: '700',
    color: '#2b2d42',
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#f0dfd2',
    borderRadius: 14,
    padding: 12,
    fontSize: 15,
  },
  inputMultiline: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  photoBox: {
    marginBottom: 16,
  },
  formImage: {
    width: '100%',
    height: 180,
    borderRadius: 16,
    marginBottom: 12,
  },
  formImagePlaceholder: {
    width: '100%',
    height: 180,
    borderRadius: 16,
    marginBottom: 12,
    backgroundColor: '#f4ece4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButton: {
    backgroundColor: '#e76f51',
    paddingVertical: 15,
    paddingHorizontal: 18,
    borderRadius: 16,
    alignItems: 'center',
    marginTop: 4,
  },
  primaryButtonDanger: {
    backgroundColor: '#e63946',
  },
  primaryButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '800',
  },
  categoryCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#f0dfd2',
  },
  categoryCardTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#2b2d42',
  },
  categoryCardText: {
    marginTop: 4,
    fontSize: 14,
    color: '#666',
  },
});

export default App;