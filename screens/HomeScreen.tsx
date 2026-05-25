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
      <View style={styles.header}>
        <Text style={styles.appName}>miKitchen</Text>
        <Text style={styles.subtitle}>
          Tu recetario personal con foto, pasos y timer de cocción.
        </Text>
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#fff8f0',
    padding: 16,
  },
  header: {
    marginTop: 16,
    marginBottom: 24,
  },
  appName: {
    fontSize: 34,
    fontWeight: '800',
    color: '#2b2d42',
  },
  subtitle: {
    marginTop: 8,
    fontSize: 16,
    lineHeight: 22,
    color: '#555',
  },
  summaryContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  infoBox: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 16,
    marginBottom: 14,
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
});

export default HomeScreen;