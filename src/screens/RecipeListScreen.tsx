import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import EmptyState from '../components/EmptyState';
import ItalianTableclothBackground from '../components/ItalianTableclothBackground';
import RecipeCard from '../components/RecipeCard';
import { useRecipes } from '../data/RecipesContext';
import { RecipeStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RecipeStackParamList, 'RecipeList'>;

const RecipeListScreen: React.FC<Props> = ({ navigation }) => {
  const { recipes } = useRecipes();

  const [searchText, setSearchText] = useState('');

  const favoriteRecipes = recipes.filter((recipe) => recipe.isFavorite).length;

  const normalizeText = (text: string) =>
    text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');

  const normalizedSearchText = normalizeText(searchText.trim());

  const filteredRecipes = recipes.filter((recipe) => {
    if (!normalizedSearchText) return true;

    const title = normalizeText(recipe.title);
    const ingredients = normalizeText(recipe.ingredients);

    return (
      title.includes(normalizedSearchText) ||
      ingredients.includes(normalizedSearchText)
    );
  });

  return (
    <ItalianTableclothBackground>
      <SafeAreaView style={styles.screen}>
        <View style={styles.headerContent}>
          <View style={styles.titleCard}>
            <Text style={styles.title}>Recetas</Text>
          </View>

          <View style={styles.descriptionCard}>
            <Text style={styles.description}>
              Buscá, organizá y creá tus recetas favoritas.
            </Text>
          </View>

          <TouchableOpacity
            style={styles.primaryAction}
            onPress={() => navigation.navigate('RecipeCreate')}
          >
            <Text style={styles.primaryActionText}>+ Nueva receta</Text>
          </TouchableOpacity>

          <View style={styles.actionsRow}>
            <TouchableOpacity
              style={styles.secondaryAction}
              onPress={() => navigation.navigate('FavoriteRecipes')}
            >
              <Text style={styles.secondaryActionText}>
                Favoritas ({favoriteRecipes})
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.secondaryAction}
              onPress={() => navigation.navigate('RecipeCategories')}
            >
              <Text style={styles.secondaryActionText}>Categorías</Text>
            </TouchableOpacity>
          </View>

          <TextInput
            style={styles.searchInput}
            value={searchText}
            onChangeText={setSearchText}
            placeholder="Buscar por receta o ingrediente..."
            placeholderTextColor="#8d8d8d"
            autoCapitalize="none"
            autoCorrect={false}
            clearButtonMode="while-editing"
          />
        </View>

        <FlatList
          data={filteredRecipes}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={
            <EmptyState
              message={
                searchText.trim()
                  ? 'No encontramos recetas con esa búsqueda.'
                  : 'Todavía no hay recetas cargadas.'
              }
            />
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
    </ItalianTableclothBackground>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: 'transparent',
    paddingTop: 0,
  },
  headerContent: {
    paddingHorizontal: 32,
    paddingTop: 32,
    marginBottom: 12,
  },
  listContent: {
    paddingBottom: 24,
  },
  actionsRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 12,
  },
  searchInput: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#f0dfd2',
    borderRadius: 16,
    paddingVertical: 13,
    paddingHorizontal: 16,
    marginTop: 12,
    fontSize: 16,
    color: '#2b2d42',
  },
  primaryAction: {
    backgroundColor: '#e76f51',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 16,
    alignItems: 'center',
  },
  primaryActionText: {
    color: '#ffffff',
    fontWeight: '800',
    fontSize: 15,
  },
  secondaryAction: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#f0dfd2',
  },
  secondaryActionText: {
    color: '#2b2d42',
    fontWeight: '800',
    fontSize: 15,
  },
  headerCard: {
    backgroundColor: 'rgba(255, 250, 242, 0.94)',
    padding: 22,
    borderRadius: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#f0dfd2',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.12,
    shadowRadius: 5,

    elevation: 3,
  },
  subtitle: {
    marginTop: 8,
    fontSize: 16,
    lineHeight: 22,
    color: '#555',
    fontWeight: '600',
  },
  titleCard: {
    backgroundColor: 'rgba(255, 244, 230, 0.96)',
    paddingVertical: 18,
    paddingHorizontal: 22,
    borderRadius: 20,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#f0dfd2',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.12,
    shadowRadius: 5,

    elevation: 3,
  },
  descriptionCard: {
    backgroundColor: 'rgba(255, 250, 242, 0.94)',
    padding: 16,
    borderRadius: 18,
    marginBottom: 22,
    borderWidth: 1,
    borderColor: '#f0dfd2',
  },
  title: {
    fontSize: 30,
    fontWeight: '800',
    color: '#2b2d42',
  },
  description: {
    fontSize: 16,
    lineHeight: 22,
    color: '#555',
    fontWeight: '600',
  },
});

export default RecipeListScreen;