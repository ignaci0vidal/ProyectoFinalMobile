import React, { useState } from 'react';
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
} from 'react-native';

import FormInput from '../components/FormInput';
import PrimaryButton from '../components/PrimaryButton';
import { useRecipes } from '../data/RecipesContext';

type Props = {
  mode?: 'create' | 'edit';
};

const RecipeFormScreen: React.FC<Props> = ({ mode = 'create' }) => {
  const { addRecipe } = useRecipes();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [cookingTime, setCookingTime] = useState('');

  const clearForm = () => {
    setTitle('');
    setCategory('');
    setCookingTime('');
  };

  // Validación simple para los campos básicos.
  const validateForm = () => {
    if (!title.trim()) {
      return 'El título es obligatorio.';
    }

    if (!category.trim()) {
      return 'La categoría es obligatoria.';
    }

    const parsedCookingTime = Number(cookingTime);

    if (Number.isNaN(parsedCookingTime) || parsedCookingTime <= 0) {
      return 'El tiempo de cocción debe ser un número mayor a 0 para poder usar el timer.';
    }

    return null;
  };

  const handleSave = async () => {
    const error = validateForm();

    if (error) {
      Alert.alert('Revisá el formulario', error);
      return;
    }

    await addRecipe({
      title: title.trim(),
      category: category.trim(),
      description: 'Sin descripción cargada.',
      ingredients: 'Ingredientes pendientes de cargar.',
      steps: 'Pasos pendientes de cargar.',
      cookingTime: Number(cookingTime),
      imageUri: undefined,
      isFavorite: false,
    });

    Alert.alert('Receta guardada', 'La receta fue agregada a tu recetario correctamente.');
    clearForm();
  };

  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>
          {mode === 'create' ? 'Nueva receta' : 'Editar receta'}
        </Text>

        <Text style={styles.helperText}>
          Ahora cargá los datos básicos de una receta. Más adelante vamos a sumar
          ingredientes, pasos, foto y edición completa.
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
          label="Tiempo de cocción en minutos"
          value={cookingTime}
          onChangeText={setCookingTime}
          placeholder="Ej: 45"
          keyboardType="numeric"
        />

        <PrimaryButton label="Guardar receta" onPress={handleSave} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#fff8f0',
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