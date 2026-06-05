import { NativeStackScreenProps } from '@react-navigation/native-stack';
import * as ImagePicker from 'expo-image-picker';
import React, { useState } from 'react';
import {
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import FormInput from '../components/FormInput';
import ItalianTableclothBackground from '../components/ItalianTableclothBackground';
import PrimaryButton from '../components/PrimaryButton';
import { useRecipes } from '../data/RecipesContext';
import { RecipeStackParamList } from '../navigation/types';

type Props =
  | (NativeStackScreenProps<RecipeStackParamList, 'RecipeCreate'> & {
    mode: 'create';
  })
  | (NativeStackScreenProps<RecipeStackParamList, 'RecipeEdit'> & {
    mode: 'edit';
  });

type IngredientItem = {
  id: string;
  name: string;
  amount: string;
};

const parseIngredientsToItems = (ingredients?: string): IngredientItem[] => {
  if (!ingredients) {
    return [];
  }

  return ingredients
    .split('\n')
    .filter((line) => line.trim().length > 0)
    .map((line, index) => {
      const [namePart, ...amountParts] = line.split(':');

      return {
        id: `${Date.now()}-${index}`,
        name: namePart.trim(),
        amount: amountParts.join(':').trim(),
      };
    });
};

const RecipeFormScreen: React.FC<Props> = (props) => {
  const { navigation, mode } = props;
  const { recipes, addRecipe, updateRecipe } = useRecipes();

  const isEditing = mode === 'edit';
  const recipeId = props.mode === 'edit' ? props.route.params.recipeId : undefined;

  const recipeToEdit = recipeId
    ? recipes.find((recipe) => recipe.id === recipeId)
    : undefined;

  const [title, setTitle] = useState(recipeToEdit?.title ?? '');
  const [category, setCategory] = useState(recipeToEdit?.category ?? '');
  const [description, setDescription] = useState(recipeToEdit?.description ?? '');
  const [cookingTime, setCookingTime] = useState(
    recipeToEdit?.cookingTime ? String(recipeToEdit.cookingTime) : ''
  );
  const [steps, setSteps] = useState(recipeToEdit?.steps ?? '');
  const [imageUri, setImageUri] = useState<string | undefined>(
    recipeToEdit?.imageUri
  );

  const [ingredientName, setIngredientName] = useState('');
  const [ingredientAmount, setIngredientAmount] = useState('');
  const [ingredientItems, setIngredientItems] = useState<IngredientItem[]>(
    parseIngredientsToItems(recipeToEdit?.ingredients)
  );

  const clearForm = () => {
    setTitle('');
    setCategory('');
    setDescription('');
    setCookingTime('');
    setSteps('');
    setImageUri(undefined);
    setIngredientName('');
    setIngredientAmount('');
    setIngredientItems([]);
  };

  const validateForm = () => {
    if (!title.trim()) {
      return 'El título es obligatorio.';
    }

    if (!category.trim()) {
      return 'La categoría es obligatoria.';
    }

    if (!description.trim()) {
      return 'La descripción es obligatoria.';
    }

    const parsedCookingTime = Number(cookingTime);

    if (Number.isNaN(parsedCookingTime) || parsedCookingTime <= 0) {
      return 'El tiempo de cocción debe ser un número mayor a 0 para poder usar el timer.';
    }

    if (ingredientItems.length === 0) {
      return 'Agregá al menos un ingrediente con su cantidad.';
    }

    if (!steps.trim()) {
      return 'La preparación es obligatoria.';
    }

    return null;
  };

  const handleAddIngredient = () => {
    if (!ingredientName.trim()) {
      Alert.alert('Ingrediente incompleto', 'Ingresá el nombre del ingrediente.');
      return;
    }

    if (!ingredientAmount.trim()) {
      Alert.alert('Cantidad incompleta', 'Ingresá la cantidad del ingrediente.');
      return;
    }

    const newIngredient: IngredientItem = {
      id: Date.now().toString(),
      name: ingredientName.trim(),
      amount: ingredientAmount.trim(),
    };

    setIngredientItems((prev) => [...prev, newIngredient]);
    setIngredientName('');
    setIngredientAmount('');
  };

  const handleRemoveIngredient = (ingredientId: string) => {
    setIngredientItems((prev) =>
      prev.filter((ingredient) => ingredient.id !== ingredientId)
    );
  };

  const handlePickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert(
        'Permiso requerido',
        'Necesitamos permiso para acceder a tu galería y seleccionar una foto.'
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 0.8,
    });

    if (result.canceled) {
      return;
    }

    setImageUri(result.assets[0].uri);
  };

  const handleTakePhoto = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert(
        'Permiso requerido',
        'Necesitamos permiso para usar la cámara y sacar una foto de la receta.'
      );
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 0.8,
    });

    if (result.canceled) {
      return;
    }

    setImageUri(result.assets[0].uri);
  };

  const handleSave = async () => {
    const error = validateForm();

    if (error) {
      Alert.alert('Revisá el formulario', error);
      return;
    }

    const formattedIngredients = ingredientItems
      .map((ingredient) => `${ingredient.name}: ${ingredient.amount}`)
      .join('\n');

    const recipeData = {
      title: title.trim(),
      category: category.trim(),
      description: description.trim(),
      ingredients: formattedIngredients,
      steps: steps.trim(),
      cookingTime: Number(cookingTime),
      imageUri,
      isFavorite: recipeToEdit?.isFavorite ?? false,
    };

    if (isEditing && recipeId) {
      await updateRecipe(recipeId, recipeData);
    } else {
      await addRecipe(recipeData);
    }

    clearForm();

    Alert.alert(
      isEditing ? 'Receta actualizada' : 'Receta guardada',
      isEditing
        ? 'Los cambios fueron guardados correctamente.'
        : 'La receta fue agregada a tu recetario correctamente.',
      [
        {
          text: isEditing ? 'Volver al detalle' : 'Ver recetas',
          onPress: () => {
            if (isEditing && recipeId) {
              navigation.navigate('RecipeDetail', { recipeId });
            } else {
              navigation.navigate('RecipeList');
            }
          },
        },
      ]
    );
  };

  return (
    <ItalianTableclothBackground>
      <SafeAreaView style={styles.screen}>
        <ScrollView contentContainerStyle={styles.content}>
          <Text style={styles.title}>
            {isEditing ? 'Editar receta' : 'Nueva receta'}
          </Text>

          <Text style={styles.helperText}>
            Cargá los datos completos de la receta. Los ingredientes se cargan
            de a uno, separando nombre y cantidad.
          </Text>

          <FormInput
            label="Título"
            value={title}
            onChangeText={setTitle}
            placeholder="Ej: Budín de pan"
          />

          <FormInput
            label="Categoría"
            value={category}
            onChangeText={setCategory}
            placeholder="Ej: Postres, Pastas, Carnes"
          />

          <FormInput
            label="Descripción"
            value={description}
            onChangeText={setDescription}
            placeholder="Ej: Receta cremosa, simple y rendidora."
            multiline
          />

          <FormInput
            label="Tiempo de cocción en minutos"
            value={cookingTime}
            onChangeText={setCookingTime}
            placeholder="Ej: 45"
            keyboardType="numeric"
          />

          <View style={styles.imageBox}>
            <Text style={styles.imageLabel}>Foto de la receta</Text>

            {imageUri ? (
              <Image source={{ uri: imageUri }} style={styles.previewImage} />
            ) : (
              <View style={styles.imagePlaceholder}>
                <Text style={styles.imagePlaceholderText}>
                  Sin foto seleccionada
                </Text>
              </View>
            )}

            <View style={styles.imageActions}>
              <PrimaryButton label="Elegir de galería" onPress={handlePickImage} />
              <PrimaryButton label="Usar cámara" onPress={handleTakePhoto} />
            </View>
          </View>

          <View style={styles.ingredientsBox}>
            <Text style={styles.ingredientsTitle}>Ingredientes</Text>

            <FormInput
              label="Ingrediente"
              value={ingredientName}
              onChangeText={setIngredientName}
              placeholder="Ej: Harina"
            />

            <FormInput
              label="Cantidad"
              value={ingredientAmount}
              onChangeText={setIngredientAmount}
              placeholder="Ej: 500 g"
            />

            <PrimaryButton
              label="Agregar ingrediente"
              onPress={handleAddIngredient}
            />

            <View style={styles.ingredientsList}>
              {ingredientItems.length === 0 ? (
                <Text style={styles.emptyIngredientsText}>
                  Todavía no agregaste ingredientes.
                </Text>
              ) : (
                ingredientItems.map((ingredient) => (
                  <View key={ingredient.id} style={styles.ingredientItem}>
                    <View style={styles.ingredientItemTextBox}>
                      <Text style={styles.ingredientItemName}>
                        {ingredient.name}
                      </Text>
                      <Text style={styles.ingredientItemAmount}>
                        {ingredient.amount}
                      </Text>
                    </View>

                    <Text
                      style={styles.removeIngredientButton}
                      onPress={() => handleRemoveIngredient(ingredient.id)}
                    >
                      Quitar
                    </Text>
                  </View>
                ))
              )}
            </View>
          </View>

          <FormInput
            label="Preparación"
            value={steps}
            onChangeText={setSteps}
            placeholder={
              'Ej:\n1. Mezclar los ingredientes.\n2. Amasar.\n3. Cocinar hasta dorar.'
            }
            multiline
          />

          <PrimaryButton
            label={isEditing ? 'Guardar cambios' : 'Guardar receta'}
            onPress={handleSave}
          />
        </ScrollView>
      </SafeAreaView>
    </ItalianTableclothBackground>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  content: {
    width: '100%',
    maxWidth: 920,
    alignSelf: 'center',
    paddingHorizontal: 32,
    paddingTop: 32,
    paddingBottom: 40,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: '#2b2d42',
    marginBottom: 10,
  },
  helperText: {
    fontSize: 15,
    color: '#666',
    lineHeight: 21,
    marginBottom: 20,
  },
  imageBox: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#f0dfd2',
    borderRadius: 18,
    padding: 16,
    marginBottom: 18,
  },
  imageLabel: {
    fontSize: 15,
    fontWeight: '700',
    color: '#2b2d42',
    marginBottom: 10,
  },
  previewImage: {
    width: '100%',
    height: 220,
    borderRadius: 14,
    marginBottom: 14,
  },
  imagePlaceholder: {
    height: 160,
    borderRadius: 14,
    backgroundColor: '#fff8f0',
    borderWidth: 1,
    borderColor: '#f0dfd2',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },
  imagePlaceholderText: {
    fontSize: 15,
    color: '#777',
    fontWeight: '700',
  },
  imageActions: {
    gap: 10,
  },
  ingredientsBox: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#f0dfd2',
    borderRadius: 18,
    padding: 16,
    marginBottom: 18,
  },
  ingredientsTitle: {
    fontSize: 17,
    fontWeight: '900',
    color: '#2b2d42',
    marginBottom: 12,
  },
  ingredientsList: {
    marginTop: 14,
    gap: 10,
  },
  emptyIngredientsText: {
    fontSize: 14,
    color: '#777',
    fontWeight: '700',
  },
  ingredientItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff8f0',
    borderRadius: 14,
    padding: 12,
    borderWidth: 1,
    borderColor: '#f0dfd2',
  },
  ingredientItemTextBox: {
    flex: 1,
    marginRight: 10,
  },
  ingredientItemName: {
    fontSize: 15,
    fontWeight: '900',
    color: '#2b2d42',
  },
  ingredientItemAmount: {
    fontSize: 14,
    color: '#555',
    marginTop: 2,
  },
  removeIngredientButton: {
    color: '#e76f51',
    fontWeight: '900',
    fontSize: 14,
  },
});

export default RecipeFormScreen;