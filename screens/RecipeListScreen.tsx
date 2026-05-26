import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
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

      <View style={styles.actionsRow}>
        <TouchableOpacity
          style={styles.primaryAction}
          onPress={() => navigation.navigate('RecipeCreate')}
        >
          <Text style={styles.primaryActionText}>+ Nueva receta</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryAction}
          onPress={() => navigation.navigate('RecipeCategories')}
        >
          <Text style={styles.secondaryActionText}>Categorías</Text>
        </TouchableOpacity>
      </View>

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
  actionsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  primaryAction: {
    flex: 1,
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
});

export default RecipeListScreen;