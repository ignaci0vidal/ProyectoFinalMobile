import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import EmptyState from '../components/EmptyState';
import { useRecipes } from '../data/RecipesContext';
import { RecipeStackParamList } from '../navigation/types';
import { getRecipeCategories } from '../utils/recipeHelpers';
import ItalianTableclothBackground from '../components/ItalianTableclothBackground';

type Props = NativeStackScreenProps<RecipeStackParamList, 'RecipeCategories'>;

const CategoriesScreen: React.FC<Props> = ({ navigation }) => {
  const { recipes } = useRecipes();

  const categories = getRecipeCategories(recipes);

  return (
    <ItalianTableclothBackground>
      <SafeAreaView style={styles.screen}>
        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.title}>Categorías</Text>

          {categories.length === 0 ? (
            <EmptyState message="Todavía no hay categorías." />
          ) : (
            categories.map((category) => {
              const total = recipes.filter(
                (recipe) => recipe.category === category
              ).length;

              return (
                <Pressable
                  key={category}
                  style={({ pressed }) => [
                    styles.card,
                    pressed && styles.cardPressed,
                  ]}
                  onPress={() =>
                    navigation.navigate('RecipeList', { category })
                  }
                >
                  <View>
                    <Text style={styles.cardTitle}>{category}</Text>
                    <Text style={styles.cardText}>
                      {total} receta{total !== 1 ? 's' : ''}
                    </Text>
                  </View>

                  <Text style={styles.cardArrow}>Ver recetas</Text>
                </Pressable>
              );
            })
          )}
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
    padding: 16,
    paddingBottom: 120,
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
    borderBottomWidth: 5,
    borderBottomColor: '#d8c8bb',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.12,
    shadowRadius: 5,
    elevation: 4,
  },
  cardPressed: {
    transform: [{ translateY: 2 }],
    borderBottomWidth: 2,
    elevation: 2,
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
  cardArrow: {
    color: '#e76f51',
    fontSize: 13,
    fontWeight: '900',
  },
});

export default CategoriesScreen;
