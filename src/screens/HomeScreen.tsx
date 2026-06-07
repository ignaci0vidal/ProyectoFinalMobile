import React from 'react';
import {
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import ItalianTableclothBackground from '../components/ItalianTableclothBackground';
import { useRecipes } from '../data/RecipesContext';

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const { recipes } = useRecipes();

  const totalRecipes = recipes.length;

  const goToRecipes = () => {
    navigation.navigate('Recetas');
  };

  const goToCreateRecipe = () => {
    navigation.navigate('Recetas', {
      screen: 'RecipeCreate',
    });
  };

  const goToTimer = () => {
    navigation.navigate('Timer');
  };

  return (
    <ItalianTableclothBackground>
      <SafeAreaView style={styles.screen}>
        <View style={styles.content}>
          <View style={styles.titleCard}>
            <Text style={styles.appName}>miKitchen</Text>
          </View>

          <View style={styles.descriptionCard}>
            <Text style={styles.subtitle}>Tus recetas organizadas.</Text>
          </View>

          <View style={styles.mainActionsContainer}>
            <Pressable
              style={({ pressed }) => [
                styles.mainButton,
                styles.recipesButton,
                pressed && styles.buttonPressed,
              ]}
              onPress={goToRecipes}
            >
              <Text style={styles.recipesButtonNumber}>{totalRecipes}</Text>
              <Text style={styles.recipesButtonLabel}>Recetas</Text>
            </Pressable>

            <Pressable
              style={({ pressed }) => [
                styles.mainButton,
                styles.createRecipeButton,
                pressed && styles.buttonPressed,
              ]}
              onPress={goToCreateRecipe}
            >
              <Text style={styles.createRecipePlus}>+</Text>
              <Text style={styles.createRecipeLabel}>Nueva receta</Text>
            </Pressable>
          </View>

          <View style={styles.timerCard}>
            <Pressable
              style={({ pressed }) => [
                styles.timerButton,
                pressed && styles.buttonPressed,
              ]}
              onPress={goToTimer}
            >
              <Text style={styles.timerButtonText}>Abrir timer de cocción</Text>
            </Pressable>
          </View>

          <View style={styles.infoBox}>
            <Text style={styles.infoTitle}>Resumen</Text>
            <Text style={styles.infoText}>
              Tenés {totalRecipes} recetas cargadas. Desde esta pantalla podés
              consultar tu recetario, crear una receta nueva o abrir el timer.
            </Text>
          </View>
        </View>
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
    flex: 1,
    width: '100%',
    maxWidth: 920,
    alignSelf: 'center',
    paddingHorizontal: 32,
    paddingTop: 32,
    paddingBottom: 24,
  },
  headerCard: {
    backgroundColor: 'rgba(255, 250, 242, 0.94)',
    padding: 22,
    borderRadius: 20,
    marginBottom: 24,
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
  appName: {
    fontSize: 34,
    fontWeight: '800',
    color: '#2b2d42',
  },
  subtitle: {
    fontSize: 17,
    lineHeight: 22,
    color: '#555',
    fontWeight: '600',
  },
  mainActionsContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 22,
  },
  mainButton: {
    flex: 1,
    minHeight: 104,
    borderRadius: 16,
    padding: 18,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.22,
    shadowRadius: 6,

    elevation: 6,
  },
  recipesButton: {
    backgroundColor: '#ffffff',
    borderColor: '#f0dfd2',
    borderBottomWidth: 5,
    borderBottomColor: '#d8c8bb',
  },
  createRecipeButton: {
    backgroundColor: '#e76f51',
    borderColor: '#c94f34',
    borderBottomWidth: 5,
    borderBottomColor: '#c94f34',
  },
  buttonPressed: {
    transform: [{ translateY: 3 }],
    borderBottomWidth: 2,
    shadowOpacity: 0.12,
    elevation: 2,
  },
  recipesButtonNumber: {
    fontSize: 32,
    fontWeight: '900',
    color: '#e76f51',
    lineHeight: 36,
    marginBottom: 6,
    textAlign: 'center',
  },
  recipesButtonLabel: {
    fontSize: 15,
    fontWeight: '900',
    color: '#2b2d42',
    textAlign: 'center',
  },
  createRecipePlus: {
    fontSize: 34,
    fontWeight: '900',
    color: '#ffffff',
    lineHeight: 38,
    marginBottom: 6,
    textAlign: 'center',
  },
  createRecipeLabel: {
    fontSize: 15,
    fontWeight: '900',
    color: '#ffffff',
    textAlign: 'center',
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
    marginBottom: 12,
  },
  infoText: {
    fontSize: 15,
    color: '#555',
    lineHeight: 21,
  },
  timerButton: {
    backgroundColor: '#e76f51',
    paddingVertical: 15,
    borderRadius: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#c94f34',
    borderBottomWidth: 5,
    borderBottomColor: '#c94f34',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 6,

    elevation: 6,
  },
  timerButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '900',
    textAlign: 'center',
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
    minHeight: 48,
    paddingVertical: 16,
    paddingHorizontal: 22,
    borderRadius: 18,
    marginBottom: 22,
    borderWidth: 1,
    borderColor: '#f0dfd2',
    justifyContent: 'center',
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
  timerCard: {
    backgroundColor: '#ffffff',
    paddingVertical: 28,
    paddingHorizontal: 22,
    borderRadius: 18,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#f0dfd2',
    justifyContent: 'center',
  },
});

export default HomeScreen;