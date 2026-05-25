import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text } from 'react-native';
import EmptyState from '../components/EmptyState';
import RecipeCard from '../components/RecipeCard';
import { useRecipes } from '../data/RecipesContext';
import { RecipeStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RecipeStackParamList, 'RecipeList'>;

const RecipeListScreen: React.FC<Props> = ({ navigation }) => {
  const { recipes } = useRecipes();

  return (
    <SafeAreaView style={styles.screen}>
      <Text style={styles.title}>Mis recetas</Text>

      <FlatList
        data={recipes}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <EmptyState message="Todavía no hay recetas cargadas." />
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
  listContent: {
    paddingBottom: 24,
  },
});

export default RecipeListScreen;