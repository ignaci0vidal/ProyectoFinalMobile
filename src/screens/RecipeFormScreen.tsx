import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import * as Haptics from 'expo-haptics';
import * as ImagePicker from 'expo-image-picker';
import React, { useEffect, useMemo, useState } from 'react';
import {
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
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
  const [imageUri, setImageUri] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (mode !== 'edit' || !recipeToEdit) return;

    setTitle(recipeToEdit.title);
    setCategory(recipeToEdit.category);
    setDescription(recipeToEdit.description);
    setIngredients(recipeToEdit.ingredients);
    setSteps(recipeToEdit.steps);
    setCookingTime(String(recipeToEdit.cookingTime));
    setImageUri(recipeToEdit.imageUri);
  }, [mode, recipeToEdit]);

  const clearForm = () => {
    setTitle('');
    setCategory('');
    setDescription('');
    setIngredients('');
    setSteps('');
    setCookingTime('');
    setImageUri(undefined);
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

  const takePhoto = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();

    if (!permission.granted) {
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);

      Alert.alert(
        'Permiso requerido',
        'Necesitamos acceso a la cámara para tomar una foto de la receta.'
      );

      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.75,
    });

    if (result.canceled) return;

    const selectedUri = result.assets[0]?.uri;

    if (!selectedUri) return;

    setImageUri(selectedUri);
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);

      Alert.alert(
        'Permiso requerido',
        'Necesitamos acceso a la galería para elegir una imagen de la receta.'
      );

      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.75,
    });

    if (result.canceled) return;

    const selectedUri = result.assets[0]?.uri;

    if (!selectedUri) return;

    setImageUri(selectedUri);
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  const removeImage = async () => {
    setImageUri(undefined);
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  const handleSave = async () => {
    const error = validateForm();

    if (error) {
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);

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

    if (mode === 'edit') {
      if (!recipeId || !recipeToEdit) {
        await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);

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
              ? 'Cargá los datos principales de la receta. También podés tomar una foto con la cámara o elegir una imagen desde la galería.'
              : 'Modificá los datos necesarios, cambiá la foto si querés y guardá los cambios para actualizar la receta.'}
          </Text>

          <View style={styles.photoSection}>
            <Text style={styles.photoTitle}>Foto de la receta</Text>

            {imageUri ? (
              <Image source={{ uri: imageUri }} style={styles.previewImage} />
            ) : (
              <View style={styles.previewPlaceholder}>
                <Ionicons name="image-outline" size={36} color="#b7352d" />
                <Text style={styles.previewPlaceholderText}>
                  Sin foto cargada
                </Text>
              </View>
            )}

            <View style={styles.photoActions}>
              <TouchableOpacity
                style={styles.photoButton}
                onPress={takePhoto}
                activeOpacity={0.85}
              >
                <Ionicons name="camera-outline" size={19} color="#ffffff" />
                <Text style={styles.photoButtonText}>Tomar foto</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.galleryButton}
                onPress={pickImage}
                activeOpacity={0.85}
              >
                <Ionicons name="images-outline" size={19} color="#e76f51" />
                <Text style={styles.galleryButtonText}>Galería</Text>
              </TouchableOpacity>
            </View>

            {imageUri && (
              <TouchableOpacity
                style={styles.removeImageButton}
                onPress={removeImage}
                activeOpacity={0.85}
              >
                <Ionicons name="trash-outline" size={17} color="#d62828" />
                <Text style={styles.removeImageText}>Quitar foto</Text>
              </TouchableOpacity>
            )}
          </View>

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
  photoSection: {
    backgroundColor: 'rgba(255, 250, 242, 0.94)',
    borderWidth: 1,
    borderColor: '#f0dfd2',
    borderRadius: 18,
    padding: 14,
    marginBottom: 18,
  },
  photoTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#2b2d42',
    marginBottom: 10,
  },
  previewImage: {
    width: '100%',
    height: 220,
    borderRadius: 16,
    backgroundColor: '#f4ece4',
    marginBottom: 12,
  },
  previewPlaceholder: {
    width: '100%',
    height: 160,
    borderRadius: 16,
    backgroundColor: '#fff3ed',
    borderWidth: 1,
    borderColor: '#f0dfd2',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    gap: 6,
  },
  previewPlaceholderText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#b7352d',
  },
  photoActions: {
    flexDirection: 'row',
    gap: 10,
  },
  photoButton: {
    flex: 1,
    backgroundColor: '#e76f51',
    borderRadius: 14,
    paddingVertical: 13,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 7,
  },
  photoButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '900',
  },
  galleryButton: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 14,
    paddingVertical: 13,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 7,
    borderWidth: 1,
    borderColor: '#e76f51',
  },
  galleryButtonText: {
    color: '#e76f51',
    fontSize: 14,
    fontWeight: '900',
  },
  removeImageButton: {
    marginTop: 12,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  removeImageText: {
    color: '#d62828',
    fontSize: 14,
    fontWeight: '800',
  },
});

export default RecipeFormScreen;