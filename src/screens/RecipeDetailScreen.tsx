import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useMemo } from 'react';
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import ItalianTableclothBackground from '../components/ItalianTableclothBackground';
import PrimaryButton from '../components/PrimaryButton';
import { useRecipes } from '../data/RecipesContext';
import { RecipeStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RecipeStackParamList, 'RecipeDetail'>;

const RecipeDetailScreen: React.FC<Props> = ({ route, navigation }) => {
  const { recipeId } = route.params;
  const { recipes, deleteRecipe, toggleFavorite } = useRecipes();

  const recipe = useMemo(() => {
    return recipes.find((item) => item.id === recipeId);
  }, [recipes, recipeId]);

  const handleEdit = () => {
    navigation.navigate('RecipeEdit', { recipeId });
  };

  const handleToggleFavorite = async () => {
    await toggleFavorite(recipeId);
  };

  const handleDelete = () => {
    Alert.alert(
      'Eliminar receta',
      '¿Seguro que querés eliminar esta receta? Esta acción no se puede deshacer.',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: async () => {
            await deleteRecipe(recipeId);
            navigation.goBack();
          },
        },
      ]
    );
  };

  if (!recipe) {
    return (
      <ItalianTableclothBackground>
        <SafeAreaView style={styles.screen}>
          <View style={styles.emptyContainer}>
            <Text style={styles.title}>Receta no encontrada</Text>
            <Text style={styles.helperText}>
              No pudimos encontrar la receta seleccionada.
            </Text>

            <PrimaryButton
              label="Volver al listado"
              onPress={() => navigation.goBack()}
            />
          </View>
        </SafeAreaView>
      </ItalianTableclothBackground>
    );
  }

  return (
    <ItalianTableclothBackground>
      <SafeAreaView style={styles.screen}>
        <ScrollView contentContainerStyle={styles.content}>
          <View style={styles.header}>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>{recipe.title}</Text>
              <Text style={styles.category}>{recipe.category}</Text>
            </View>

            <TouchableOpacity
              style={styles.favoriteButton}
              onPress={handleToggleFavorite}
              activeOpacity={0.8}
            >
              <Ionicons
                name={recipe.isFavorite ? 'heart' : 'heart-outline'}
                size={28}
                color={recipe.isFavorite ? '#e63946' : '#777'}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.infoCard}>
            <View style={styles.infoItem}>
              <Ionicons name="timer-outline" size={20} color="#e76f51" />
              <Text style={styles.infoText}>
                {recipe.cookingTime} minutos de cocción
              </Text>
            </View>

            <View style={styles.infoItem}>
              <Ionicons name="calendar-outline" size={20} color="#e76f51" />
              <Text style={styles.infoText}>
                Creada el {new Date(recipe.createdAt).toLocaleDateString()}
              </Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Descripción</Text>
            <Text style={styles.sectionText}>{recipe.description}</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Ingredientes</Text>
            <Text style={styles.sectionText}>{recipe.ingredients}</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Pasos de preparación</Text>
            <Text style={styles.sectionText}>{recipe.steps}</Text>
          </View>

          <View style={styles.actions}>
            <PrimaryButton label="Editar receta" onPress={handleEdit} />

            <TouchableOpacity
              style={styles.deleteButton}
              onPress={handleDelete}
              activeOpacity={0.8}
            >
              <Ionicons name="trash-outline" size={20} color="#ffffff" />
              <Text style={styles.deleteButtonText}>Eliminar receta</Text>
            </TouchableOpacity>
          </View>
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
  emptyContainer: {
    flex: 1,
    width: '100%',
    maxWidth: 920,
    alignSelf: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 16,
    marginBottom: 18,
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#2b2d42',
    marginBottom: 6,
  },
  category: {
    fontSize: 16,
    fontWeight: '700',
    color: '#e76f51',
  },
  helperText: {
    fontSize: 15,
    color: '#666',
    lineHeight: 21,
    marginBottom: 20,
  },
  favoriteButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#f0dfd2',
  },
  infoCard: {
    backgroundColor: '#ffffff',
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: '#f0dfd2',
    marginBottom: 18,
    gap: 10,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  infoText: {
    fontSize: 15,
    color: '#444',
    fontWeight: '600',
  },
  section: {
    backgroundColor: '#ffffff',
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: '#f0dfd2',
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#2b2d42',
    marginBottom: 8,
  },
  sectionText: {
    fontSize: 15,
    color: '#444',
    lineHeight: 22,
  },
  actions: {
    marginTop: 8,
    gap: 12,
  },
  deleteButton: {
    backgroundColor: '#d62828',
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  deleteButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '800',
  },
});

export default RecipeDetailScreen;