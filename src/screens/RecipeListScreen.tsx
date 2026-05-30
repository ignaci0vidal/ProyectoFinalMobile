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
import ItalianTableclothBackground from '../components/ItalianTableclothBackground';
import RecipeCard from '../components/RecipeCard';
import { useRecipes } from '../data/RecipesContext';
import { RecipeStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RecipeStackParamList, 'RecipeList'>;

const RecipeListScreen: React.FC<Props> = ({ navigation }) => {
  const { recipes } = useRecipes();

  const totalRecipes = recipes.length;

  return (
    <ItalianTableclothBackground>
      <SafeAreaView style={styles.screen}>
        <View style={styles.headerContent}>
          <Text style={styles.title}>Mis recetas</Text>

          <Text style={styles.subtitle}>
            {totalRecipes === 0
              ? 'Todavía no cargaste recetas.'
              : `Tenés ${totalRecipes} receta${totalRecipes === 1 ? '' : 's'} guardada${totalRecipes === 1 ? '' : 's'}.`}
          </Text>

          <View style={styles.actionsRow}>
            <TouchableOpacity
              style={styles.primaryAction}
              onPress={() => navigation.navigate('RecipeCreate')}
              activeOpacity={0.85}
            >
              <Text style={styles.primaryActionText}>+ Nueva receta</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.secondaryAction}
              onPress={() => navigation.navigate('RecipeCategories')}
              activeOpacity={0.85}
            >
              <Text style={styles.secondaryActionText}>Categorías</Text>
            </TouchableOpacity>
          </View>
        </View>

        <FlatList
          data={recipes}
          keyExtractor={(item) => item.id}
          contentContainerStyle={[
            styles.listContent,
            totalRecipes === 0 && styles.emptyListContent,
          ]}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <EmptyState message="Todavía no hay recetas cargadas. Tocá “Nueva receta” para agregar la primera." />
          }
          ItemSeparatorComponent={() => <View style={styles.separator} />}
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
    paddingTop: 16,
  },
  headerContent: {
    width: '100%',
    maxWidth: 920,
    alignSelf: 'center',
    paddingHorizontal: 16,
    marginBottom: 8,
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
    marginBottom: 16,
  },
  actionsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
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
  listContent: {
    width: '100%',
    maxWidth: 920,
    alignSelf: 'center',
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 32,
  },
  emptyListContent: {
    flexGrow: 1,
  },
  separator: {
    height: 12,
  },
});

export default RecipeListScreen;