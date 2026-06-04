import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useState } from 'react';

import { useAuth } from '../data/AuthContext';
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

import FavoriteRecipesScreen from '../screens/FavoriteRecipesScreen';

const Tab = createBottomTabNavigator<RootTabParamList>();
const RecipeStack = createNativeStackNavigator<RecipeStackParamList>();

const RecipesStackScreen: React.FC = () => {
  return (
    <RecipeStack.Navigator>
      <RecipeStack.Screen
        name="RecipeList"
        component={RecipeListScreen}
        options={{ title: 'Recetas' }}
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
        name="RecipeCategories"
        component={CategoriesScreen}
        options={{ title: 'Categorías' }}
      />
    </RecipeStack.Navigator>
  );
};

const MainTabs: React.FC = () => {
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
        tabBarStyle: {
          height: 82,
          paddingTop: 8,
          paddingBottom: 18,
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

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Inicio" component={HomeScreen} />
      <Tab.Screen name="Recetas" component={RecipesStackScreen} />
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

export default AppNavigator;