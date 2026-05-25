import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import EmptyState from '../components/EmptyState';
import { useRecipes } from '../data/RecipesContext';
import { getRecipeCategories } from '../utils/recipeHelpers';

const CategoriesScreen: React.FC = () => {
  const { recipes } = useRecipes();

  const categories = getRecipeCategories(recipes);

  return (
    <SafeAreaView style={styles.screen}>
      <Text style={styles.title}>Categorías</Text>

      {categories.length === 0 ? (
        <EmptyState message="Todavía no hay categorías." />
      ) : (
        categories.map((category) => {
          const total = recipes.filter(
            (recipe) => recipe.category === category
          ).length;

          return (
            <View key={category} style={styles.card}>
              <Text style={styles.cardTitle}>{category}</Text>
              <Text style={styles.cardText}>
                {total} receta{total !== 1 ? 's' : ''}
              </Text>
            </View>
          );
        })
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#fff8f0',
    padding: 16,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: '#2b2d42',
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#f0dfd2',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#2b2d42',
  },
  cardText: {
    marginTop: 4,
    fontSize: 14,
    color: '#666',
  },
});

export default CategoriesScreen;