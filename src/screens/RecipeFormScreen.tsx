import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useMemo, useState } from 'react';
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
} from 'react-native';

import FormInput from '../components/FormInput';
import ItalianTableclothBackground from '../components/ItalianTableclothBackground';
import PrimaryButton from '../components/PrimaryButton';
import { useRecipes } from '../data/RecipesContext';
import { RecipeStackParamList } from '../navigation/types';

type CreateProps = NativeStackScreenProps<RecipeStackParamList, 'RecipeCreate'>;
type EditProps = NativeStackScreenProps<RecipeStackParamList, 'RecipeEdit'>;

type Props = (CreateProps | EditProps) & {
  mode?: 'create' | 'edit';
};

const RecipeFormScreen: React.FC<Props> = ({
  mode = 'create',
  route,
  navigation,
}) => {
  const { recipes, addRecipe, updateRecipe } = useRecipes();

  const recipeId = mode === 'edit' ? route.params?.recipeId : undefined;

  const recipeToEdit = useMemo(() => {
    if (!recipeId) return undefined;

    return recipes.find((recipe) => recipe.id === recipeId);
  }, [recipeId, recipes]);

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [steps, setSteps] = useState('');
  const [cookingTime, setCookingTime] = useState('');

  useEffect(() => {
    if (mode !== 'edit' || !recipeToEdit) return;

    setTitle(recipeToEdit.title);
    setCategory(recipeToEdit.category);
    setDescription(recipeToEdit.description);
    setIngredients(recipeToEdit.ingredients);
    setSteps(recipeToEdit.steps);
    setCookingTime(String(recipeToEdit.cookingTime));
  }, [mode, recipeToEdit]);

  const clearForm = () => {
    setTitle('');
    setCategory('');
    setDescription('');
    setIngredients('');
    setSteps('');
    setCookingTime('');
  };

  const validateForm = () => {
    if (!title.trim()) {
      return 'El título es obligatorio.';
    }

    if (title.trim().length < 3) {
      return 'El título debe tener al menos 3 caracteres.';
    }

    if (!category.trim()) {
      return 'La categoría es obligatoria.';
    }

    if (!description.trim()) {
      return 'La descripción es obligatoria.';
    }

    if (!ingredients.trim()) {
      return 'Los ingredientes son obligatorios.';
    }

    if (!steps.trim()) {
      return 'Los pasos de preparación son obligatorios.';
    }

    if (!cookingTime.trim()) {
      return 'El tiempo de cocción es obligatorio.';
    }

    const parsedCookingTime = Number(cookingTime);

    if (
      Number.isNaN(parsedCookingTime) ||
      !Number.isFinite(parsedCookingTime) ||
      parsedCookingTime <= 0
    ) {
      return 'El tiempo de cocción debe ser un número mayor a 0.';
    }

    if (!Number.isInteger(parsedCookingTime)) {
      return 'El tiempo de cocción debe ser un número entero. Por ejemplo: 45.';
    }

    return null;
  };

  const handleSave = async () => {
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
      imageUri: recipeToEdit?.imageUri,
      isFavorite: recipeToEdit?.isFavorite ?? false,
    };

    if (mode === 'edit') {
      if (!recipeId || !recipeToEdit) {
        Alert.alert(
          'No se pudo editar',
          'No encontramos la receta seleccionada.'
        );
        return;
      }

      await updateRecipe(recipeId, recipeData);

      Alert.alert(
        'Receta actualizada',
        'Los cambios fueron guardados correctamente.'
      );

      navigation.goBack();
      return;
    }

    await addRecipe(recipeData);

    Alert.alert(
      'Receta guardada',
      'La receta fue agregada a tu recetario correctamente.'
    );

    clearForm();
  };

  if (mode === 'edit' && recipeId && !recipeToEdit) {
    return (
      <ItalianTableclothBackground>
        <SafeAreaView style={styles.screen}>
          <ScrollView contentContainerStyle={styles.content}>
            <Text style={styles.title}>Receta no encontrada</Text>
            <Text style={styles.helperText}>
              No pudimos encontrar la receta que intentás editar.
            </Text>
          </ScrollView>
        </SafeAreaView>
      </ItalianTableclothBackground>
    );
  }

  return (
    <ItalianTableclothBackground>
      <SafeAreaView style={styles.screen}>
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.title}>
            {mode === 'create' ? 'Nueva receta' : 'Editar receta'}
          </Text>

          <Text style={styles.helperText}>
            {mode === 'create'
              ? 'Cargá los datos principales de la receta. Estos datos se van a usar para mostrarla en el listado, verla en detalle y utilizar el timer de cocción.'
              : 'Modificá los datos necesarios y guardá los cambios para actualizar la receta.'}
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
            placeholder="Ej: Receta casera, simple y económica"
            multiline
          />

          <FormInput
            label="Ingredientes"
            value={ingredients}
            onChangeText={setIngredients}
            placeholder="Ej: Pan, leche, huevos, azúcar"
            multiline
          />

          <FormInput
            label="Pasos de preparación"
            value={steps}
            onChangeText={setSteps}
            placeholder="Ej: Mezclar, hornear y dejar enfriar"
            multiline
          />

          <FormInput
            label="Tiempo de cocción en minutos"
            value={cookingTime}
            onChangeText={setCookingTime}
            placeholder="Ej: 45"
            keyboardType="numeric"
          />

          <PrimaryButton
            label={mode === 'create' ? 'Guardar receta' : 'Guardar cambios'}
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
});

export default RecipeFormScreen;