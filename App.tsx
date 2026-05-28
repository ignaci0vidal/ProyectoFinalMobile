import React from 'react';
import AppNavigator from './src/navigation/AppNavigator';
import { RecipesProvider } from './src/data/RecipesContext';

export default function App() {
  return (
    <RecipesProvider>
      <AppNavigator />
    </RecipesProvider>
  );
}