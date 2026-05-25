import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import CategoriesScreen from '../screens/CategoriesScreen';
import HomeScreen from '../screens/HomeScreen';
import RecipeDetailScreen from '../screens/RecipeDetailScreen';
import RecipeFormScreen from '../screens/RecipeFormScreen';
import RecipeListScreen from '../screens/RecipeListScreen';
import SettingsScreen from '../screens/SettingsScreen';
import { RecipeStackParamList, RootTabParamList } from './types';

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
        name="RecipeDetail"
        component={RecipeDetailScreen}
        options={{ title: 'Detalle de receta' }}
      />

      <RecipeStack.Screen
        name="RecipeEdit"
        options={{ title: 'Editar receta' }}
      >
        {(props) => <RecipeFormScreen {...props} mode="edit" />}
      </RecipeStack.Screen>
    </RecipeStack.Navigator>
  );
};

const CreateRecipeTabScreen: React.FC = () => {
  return <RecipeFormScreen mode="create" />;
};

const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarActiveTintColor: '#e76f51',
          tabBarInactiveTintColor: '#777',
          tabBarLabelStyle: {
            fontSize: 11,
            fontWeight: '600',
          },
          tabBarStyle: {
            height: 62,
            paddingTop: 6,
            paddingBottom: 8,
          },
          tabBarIcon: ({ color, size }) => {
            let iconName: keyof typeof Ionicons.glyphMap = 'help-circle-outline';

            if (route.name === 'Inicio') iconName = 'home-outline';
            if (route.name === 'Recetas') iconName = 'restaurant-outline';
            if (route.name === 'Nueva') iconName = 'add-circle-outline';
            if (route.name === 'Categorias') iconName = 'grid-outline';
            if (route.name === 'Ajustes') iconName = 'settings-outline';

            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen name="Inicio" component={HomeScreen} />
        <Tab.Screen name="Recetas" component={RecipesStackScreen} />
        <Tab.Screen name="Nueva" component={CreateRecipeTabScreen} />
        <Tab.Screen name="Categorias" component={CategoriesScreen} />
        <Tab.Screen name="Ajustes" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;