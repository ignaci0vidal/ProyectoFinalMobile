import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import SummaryCard from '../components/SummaryCard';
import { useRecipes } from '../data/RecipesContext';

const HomeScreen: React.FC = () => {
  const { recipes } = useRecipes();

  const totalRecipes = recipes.length;
  const favoriteRecipes = recipes.filter((recipe) => recipe.isFavorite).length;
  const categories = new Set(recipes.map((recipe) => recipe.category)).size;

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.appName}>miKitchen</Text>
          <Text style={styles.subtitle}>Mis recetas.</Text>
        </View>

        <View style={styles.summaryContainer}>
          <SummaryCard label="Recetas" value={totalRecipes.toString()} />
          <SummaryCard label="Favoritas" value={favoriteRecipes.toString()} />
          <SummaryCard label="Categorías" value={categories.toString()} />
        </View>

        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>Objetivo de la app</Text>
          <Text style={styles.infoText}>
            Guardar recetas propias, organizarlas por categoría, documentarlas con
            foto y usar un timer simple durante la cocción.
          </Text>
        </View>

        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>Elementos nativos incluidos</Text>
          <Text style={styles.infoText}>• Cámara o galería para foto de receta</Text>
          <Text style={styles.infoText}>• Feedback háptico al guardar acciones</Text>
          <Text style={styles.infoText}>• Timer de cocción con alerta</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#fff8f0',

  },
  header: {
  
    marginBottom: 30,
  },
  appName: {
    fontSize: 34,
    fontWeight: '800',
    color: '#2b2d42',
  },
  subtitle: {
    marginTop: 10,
    fontSize: 18,
    lineHeight: 24,
    color: '#555',
    fontWeight: '600',
  },
  summaryContainer: {
    flexDirection: 'row',
    marginBottom: 22,
    gap: 4,
  },
  infoBox: {
    backgroundColor: '#ffffff',
    padding: 22,
    borderRadius: 18,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#f0dfd2',
  },
  infoTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#2b2d42',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 15,
    color: '#555',
    lineHeight: 21,
  },
  content: {
    flex: 1,
    width: '100%',
    maxWidth: 920,
    alignSelf: 'center',
    paddingHorizontal: 32,
    paddingTop: 32,
    paddingBottom: 24,
  },
});

export default HomeScreen;