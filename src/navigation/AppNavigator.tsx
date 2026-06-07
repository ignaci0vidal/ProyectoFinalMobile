import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useState } from 'react';

import { useAuth } from '../data/AuthContext';
import { useRecipes } from '../data/RecipesContext';
import CategoriesScreen from '../screens/CategoriesScreen';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import RecipeDetailScreen from '../screens/RecipeDetailScreen';
import RecipeFormScreen from '../screens/RecipeFormScreen';
import RecipeListScreen from '../screens/RecipeListScreen';
import SettingsScreen from '../screens/SettingsScreen';
import SignupScreen from '../screens/SignupScreen';
import TimerScreen from '../screens/TimerScreen';
import { RecipeStackParamList, RootTabParamList } from './types';

import { StyleSheet, Text, View } from 'react-native';

import FavoriteRecipesScreen from '../screens/FavoriteRecipesScreen';

const Tab = createBottomTabNavigator<RootTabParamList>();
const RecipeStack = createNativeStackNavigator<RecipeStackParamList>();

const RecipesStackScreen: React.FC = () => {
  return (
    <RecipeStack.Navigator>
      <RecipeStack.Screen
        name="RecipeList"
        component={RecipeListScreen}
        options={{ headerShown: false }}
      />

      <RecipeStack.Screen
        name="FavoriteRecipes"
        component={FavoriteRecipesScreen}
        options={{ title: 'Favoritas' }}
      />

      <RecipeStack.Screen
        name="RecipeDetail"
        component={RecipeDetailScreen}
        options={{ title: 'Detalle de receta' }}
      />

      <RecipeStack.Screen
        name="RecipeCreate"
        options={{ title: 'Nueva receta' }}
      >
        {(props) => <RecipeFormScreen {...props} mode="create" />}
      </RecipeStack.Screen>

      <RecipeStack.Screen
        name="RecipeEdit"
        options={{ title: 'Editar receta' }}
      >
        {(props) => <RecipeFormScreen {...props} mode="edit" />}
      </RecipeStack.Screen>

      <RecipeStack.Screen
        name="RecipeCategories"
        component={CategoriesScreen}
        options={{ title: 'Categorías' }}
      />
    </RecipeStack.Navigator>
  );
};

const MainTabs: React.FC = () => {
  const { recipes } = useRecipes();
  const totalRecipes = recipes.length;

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#e76f51',
        tabBarInactiveTintColor: '#777',
        tabBarLabelStyle: {
          fontSize: 14,
          fontWeight: '700',
          marginBottom: 2,
        },
        tabBarBadgeStyle: {
          backgroundColor: '#e76f51',
          color: '#ffffff',
          fontWeight: '500',
          fontSize: 11,
          minWidth: 18,
          height: 18,
          borderRadius: 9,
          lineHeight: 16,
          top: -8,
          right: -8,
        },
        tabBarStyle: {
          height: 94,
          paddingTop: 8,
          paddingBottom: 30,
          backgroundColor: '#ffffff',
          borderTopWidth: 1,
          borderTopColor: '#f0dfd2',
        },
        tabBarIcon: ({ color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap = 'help-circle-outline';

          if (route.name === 'Inicio') iconName = 'home-outline';
          if (route.name === 'Recetas') iconName = 'restaurant-outline';
          if (route.name === 'Timer') iconName = 'timer-outline';
          if (route.name === 'Ajustes') iconName = 'settings-outline';

          const shouldShowRecipesBadge = route.name === 'Recetas' && totalRecipes > 0;

          return (
            <View style={styles.tabIconContainer}>
              <Ionicons name={iconName} size={size} color={color} />

              {shouldShowRecipesBadge && (
                <View style={styles.recipesBadge}>
                  <Text style={styles.recipesBadgeText}>{totalRecipes}</Text>
                </View>
              )}
            </View>
          );
        },
      })}
    >
      <Tab.Screen name="Inicio" component={HomeScreen} />
      <Tab.Screen
        name="Recetas"
        component={RecipesStackScreen}

      />
      <Tab.Screen name="Timer" component={TimerScreen} />
      <Tab.Screen name="Ajustes" component={SettingsScreen} />
    </Tab.Navigator>
  );
};

const AppNavigator: React.FC = () => {
  const { currentUser } = useAuth();
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');

  return (
    <NavigationContainer>
      {currentUser ? (
        <MainTabs />
      ) : authMode === 'login' ? (
        <LoginScreen onGoToSignup={() => setAuthMode('signup')} />
      ) : (
        <SignupScreen onGoToLogin={() => setAuthMode('login')} />
      )}
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  tabIconContainer: {
    width: 34,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  recipesBadge: {
    position: 'absolute',
    top: -8,
    right: -8,
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#e76f51',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  recipesBadgeText: {
    color: '#ffffff',
    fontSize: 11,
    fontWeight: '900',
    lineHeight: 13,
  },
});

export default AppNavigator;