import { Ionicons } from '@expo/vector-icons';
import React, { useMemo } from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import EmptyState from '../components/EmptyState';
import ItalianTableclothBackground from '../components/ItalianTableclothBackground';
import { useRecipes } from '../data/RecipesContext';

type CategorySummary = {
  name: string;
  total: number;
  favorites: number;
};

const CategoriesScreen: React.FC = () => {
  const { recipes } = useRecipes();

  const categorySummaries = useMemo<CategorySummary[]>(() => {
    const grouped = recipes.reduce<Record<string, CategorySummary>>(
      (acc, recipe) => {
        const categoryName = recipe.category.trim() || 'Sin categoría';

        if (!acc[categoryName]) {
          acc[categoryName] = {
            name: categoryName,
            total: 0,
            favorites: 0,
          };
        }

        acc[categoryName].total += 1;

        if (recipe.isFavorite) {
          acc[categoryName].favorites += 1;
        }

        return acc;
      },
      {}
    );

    return Object.values(grouped).sort((a, b) =>
      a.name.localeCompare(b.name)
    );
  }, [recipes]);

  const totalCategories = categorySummaries.length;
  const totalRecipes = recipes.length;

  return (
    <ItalianTableclothBackground>
      <SafeAreaView style={styles.screen}>
        <View style={styles.header}>
          <Text style={styles.title}>Categorías</Text>

          <Text style={styles.subtitle}>
            {totalCategories === 0
              ? 'Cuando cargues recetas, sus categorías aparecerán acá.'
              : `${totalCategories} categoría${totalCategories === 1 ? '' : 's'} · ${totalRecipes} receta${totalRecipes === 1 ? '' : 's'} en total.`}
          </Text>
        </View>

        <FlatList
          data={categorySummaries}
          keyExtractor={(item) => item.name}
          contentContainerStyle={[
            styles.listContent,
            totalCategories === 0 && styles.emptyListContent,
          ]}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <EmptyState message="Todavía no hay categorías. Agregá una receta para empezar a organizar tu recetario." />
          }
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View style={styles.iconContainer}>
                <Ionicons name="pricetag-outline" size={24} color="#e76f51" />
              </View>

              <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>{item.name}</Text>

                <Text style={styles.cardText}>
                  {item.total} receta{item.total !== 1 ? 's' : ''}
                </Text>

                <View style={styles.metaRow}>
                  <Ionicons
                    name={item.favorites > 0 ? 'heart' : 'heart-outline'}
                    size={15}
                    color={item.favorites > 0 ? '#e63946' : '#999'}
                  />

                  <Text style={styles.metaText}>
                    {item.favorites} favorita{item.favorites !== 1 ? 's' : ''}
                  </Text>
                </View>
              </View>
            </View>
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
    paddingTop: 16,
  },
  header: {
    width: '100%',
    maxWidth: 920,
    alignSelf: 'center',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: '#2b2d42',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 15,
    color: '#666',
    lineHeight: 21,
  },
  listContent: {
    width: '100%',
    maxWidth: 920,
    alignSelf: 'center',
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
  emptyListContent: {
    flexGrow: 1,
  },
  separator: {
    height: 12,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: '#f0dfd2',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#fff3ed',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#f0dfd2',
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#2b2d42',
  },
  cardText: {
    marginTop: 3,
    fontSize: 14,
    color: '#666',
    fontWeight: '600',
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginTop: 7,
  },
  metaText: {
    fontSize: 13,
    color: '#777',
    fontWeight: '700',
  },
});

export default CategoriesScreen;