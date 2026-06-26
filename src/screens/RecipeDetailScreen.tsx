import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import {
  //Alert,
  Image,
  Modal,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import ItalianTableclothBackground from '../components/ItalianTableclothBackground';
import { useRecipes } from '../data/RecipesContext';
import { RecipeStackParamList } from '../navigation/types';
import { formatIngredient } from '../utils/recipeHelpers';

type Props = NativeStackScreenProps<RecipeStackParamList, 'RecipeDetail'>;

const RecipeDetailScreen: React.FC<Props> = ({ route, navigation }) => {
  const { recipes, toggleFavorite, deleteRecipe } = useRecipes();
  const [isImageModalVisible, setIsImageModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);

  const { recipeId } = route.params;

  const recipe = recipes.find((item) => item.id === recipeId);

  if (!recipe) {
    return (
      <ItalianTableclothBackground>
        <SafeAreaView style={styles.screen}>
          <View style={styles.emptyBox}>
            <Text style={styles.emptyTitle}>Receta no encontrada</Text>
            <Text style={styles.emptyText}>
              No se pudo encontrar la receta seleccionada.
            </Text>
          </View>
        </SafeAreaView>
      </ItalianTableclothBackground>
    );
  }

  const handleToggleFavorite = async () => {
    await toggleFavorite(recipe.id);
  };

  const handleDeleteRecipe = () => {
    setIsDeleteModalVisible(true);
  };

  const handleConfirmDeleteRecipe = async () => {
    await deleteRecipe(recipe.id);
    setIsDeleteModalVisible(false);
    navigation.navigate('RecipeList');
  };


  return (
    <ItalianTableclothBackground>
      <SafeAreaView style={styles.screen}>
        <ScrollView contentContainerStyle={styles.content}>
          {(recipe.imageUri || recipe.imageSource) && (
            <Pressable onPress={() => setIsImageModalVisible(true)}>
              <Image
                source={recipe.imageUri ? { uri: recipe.imageUri } : recipe.imageSource}
                style={styles.recipeImage}
              />
            </Pressable>
          )}

          <View style={styles.headerCard}>
            <Text style={styles.category}>{recipe.category}</Text>
            <Text style={styles.title}>{recipe.title}</Text>
            <Text style={styles.description}>{recipe.description}</Text>

            <View style={styles.metaRow}>
              <View style={styles.metaBox}>
                <Text style={styles.metaValue}>{recipe.cookingTime} min</Text>
                <Text style={styles.metaLabel}>Tiempo</Text>
              </View>

              <View style={styles.metaBox}>
                <Text style={styles.metaValue}>
                  {recipe.isFavorite ? 'Sí' : 'No'}
                </Text>
                <Text style={styles.metaLabel}>Favorita</Text>
              </View>
            </View>

            <View style={styles.favoriteButtonWrapper}>
              <Text style={styles.favoriteHelper}>
                {recipe.isFavorite
                  ? 'Esta receta está marcada como favorita.'
                  : 'Esta receta todavía no está marcada como favorita.'}
              </Text>

              <Pressable
                style={styles.favoriteButton}
                onPress={handleToggleFavorite}
              >
                <Text style={styles.favoriteButtonText}>
                  {recipe.isFavorite
                    ? 'Quitar de favoritas'
                    : 'Agregar a favoritas'}
                </Text>
              </Pressable>

              <Pressable
                style={styles.editButton}
                onPress={() => navigation.navigate('RecipeEdit', { recipeId })}
              >
                <Text style={styles.editButtonText}>Editar receta</Text>
              </Pressable>

              <Pressable
                style={styles.deleteButton}
                onPress={handleDeleteRecipe}
              >
                <Text style={styles.deleteButtonText}>Eliminar receta</Text>
              </Pressable>
            </View>
          </View>

          <View style={styles.sectionCard}>
            <Text style={styles.sectionTitle}>Ingredientes</Text>

            {recipe.ingredients.map((ingredient, index) => {
              const amount = [ingredient.amount, ingredient.unit]
                .filter((value) => value.trim().length > 0)
                .join(' ');

              return (
                <View
                  key={`${formatIngredient(ingredient)}-${index}`}
                  style={styles.ingredientRow}
                >
                  <Text style={styles.ingredientName}>{ingredient.name}</Text>
                  <View style={styles.dottedLine} />
                  {amount !== '' && (
                    <Text style={styles.ingredientAmount}>
                      {amount}
                    </Text>
                  )}
                </View>
              );
            })}
          </View>

          <View style={styles.sectionCard}>
            <Text style={styles.sectionTitle}>Preparación</Text>
            <Text style={styles.sectionText}>{recipe.steps}</Text>
          </View>
        </ScrollView>

        {(recipe.imageUri || recipe.imageSource) && (
          <Modal
            visible={isImageModalVisible}
            transparent
            animationType="fade"
            onRequestClose={() => setIsImageModalVisible(false)}
          >
            <Pressable
              style={styles.imageModalOverlay}
              onPress={() => setIsImageModalVisible(false)}
            >
              <Image
                source={recipe.imageUri ? { uri: recipe.imageUri } : recipe.imageSource}
                style={styles.fullscreenImage}
                resizeMode="contain"
              />

              <Text style={styles.closeImageText}>
                Tocar la imagen para cerrar
              </Text>
            </Pressable>
          </Modal>
        )}

        <Modal
          visible={isDeleteModalVisible}
          transparent
          animationType="fade"
          onRequestClose={() => setIsDeleteModalVisible(false)}
        >
          <View style={styles.deleteModalOverlay}>
            <View style={styles.deleteModalCard}>
              <Text style={styles.deleteModalTitle}>Eliminar receta</Text>

              <Text style={styles.deleteModalText}>
                ¿Seguro que querés eliminar esta receta? Esta acción no se puede deshacer.
              </Text>

              <View style={styles.deleteModalActions}>
                <Pressable
                  style={styles.cancelDeleteButton}
                  onPress={() => setIsDeleteModalVisible(false)}
                >
                  <Text style={styles.cancelDeleteButtonText}>Cancelar</Text>
                </Pressable>

                <Pressable
                  style={styles.confirmDeleteButton}
                  onPress={handleConfirmDeleteRecipe}
                >
                  <Text style={styles.confirmDeleteButtonText}>Eliminar</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
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
    padding: 16,
    paddingBottom: 32,
  },
  recipeImage: {
    width: '100%',
    height: 240,
    borderRadius: 18,
    marginBottom: 16,
  },
  headerCard: {
    backgroundColor: '#ffffff',
    borderRadius: 18,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#f0dfd2',
  },
  category: {
    fontSize: 14,
    fontWeight: '900',
    color: '#e76f51',
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  title: {
    fontSize: 28,
    fontWeight: '900',
    color: '#2b2d42',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#555',
    lineHeight: 23,
    marginBottom: 18,
  },
  metaRow: {
    flexDirection: 'row',
    gap: 12,
  },
  metaBox: {
    flex: 1,
    backgroundColor: '#fff8f0',
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: '#f0dfd2',
  },
  metaValue: {
    fontSize: 18,
    fontWeight: '900',
    color: '#e76f51',
    marginBottom: 4,
  },
  metaLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: '#555',
  },
  favoriteButtonWrapper: {
    marginTop: 16,
  },
  favoriteHelper: {
    fontSize: 14,
    color: '#555',
    marginBottom: 10,
    lineHeight: 20,
  },
  favoriteButton: {
    backgroundColor: '#e76f51',
    borderRadius: 14,
    paddingVertical: 13,
    alignItems: 'center',
  },
  favoriteButtonText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '900',
  },
  sectionCard: {
    backgroundColor: '#ffffff',
    borderRadius: 18,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#f0dfd2',
  },
  sectionTitle: {
    fontSize: 19,
    fontWeight: '900',
    color: '#2b2d42',
    marginBottom: 12,
  },
  sectionText: {
    fontSize: 16,
    color: '#444',
    lineHeight: 24,
  },
  ingredientRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 10,
  },
  ingredientName: {
    fontSize: 16,
    color: '#444',
    fontWeight: '600',
  },
  dottedLine: {
    flex: 1,
    borderBottomWidth: 1,
    borderStyle: 'dotted',
    borderColor: '#999',
    marginHorizontal: 8,
    marginBottom: 4,
  },
  ingredientAmount: {
    fontSize: 16,
    color: '#444',
    fontWeight: '700',
    textAlign: 'right',
  },
  imageModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.92)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  fullscreenImage: {
    width: '100%',
    height: '82%',
  },
  closeImageText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '700',
    marginTop: 12,
  },
  emptyBox: {
    backgroundColor: '#ffffff',
    margin: 16,
    padding: 20,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#f0dfd2',
  },
  emptyTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: '#2b2d42',
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 15,
    color: '#555',
    lineHeight: 22,
  },

  deleteButton: {
    marginTop: 12,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e63946',
    borderRadius: 14,
    paddingVertical: 13,
    alignItems: 'center',
  },

  deleteButtonText: {
    color: '#e63946',
    fontSize: 15,
    fontWeight: '900',
  },

  editButton: {
    marginTop: 16,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
    backgroundColor: '#2f6f4e',
    alignItems: 'center',
  },

  editButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  deleteModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.55)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },

  deleteModalCard: {
    width: '100%',
    maxWidth: 420,
    backgroundColor: '#ffffff',
    borderRadius: 18,
    padding: 22,
    borderWidth: 1,
    borderColor: '#f0dfd2',
  },

  deleteModalTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: '#2b2d42',
    marginBottom: 10,
  },

  deleteModalText: {
    fontSize: 15,
    color: '#555',
    lineHeight: 22,
    marginBottom: 18,
  },

  deleteModalActions: {
    gap: 10,
  },

  cancelDeleteButton: {
    backgroundColor: '#fff8f0',
    borderWidth: 1,
    borderColor: '#f0dfd2',
    borderRadius: 14,
    paddingVertical: 13,
    alignItems: 'center',
  },

  cancelDeleteButtonText: {
    color: '#2b2d42',
    fontSize: 15,
    fontWeight: '900',
  },

  confirmDeleteButton: {
    backgroundColor: '#e63946',
    borderRadius: 14,
    paddingVertical: 13,
    alignItems: 'center',
  },

  confirmDeleteButtonText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '900',
  },
});

export default RecipeDetailScreen;
