import React from 'react';
import ItalianTableclothBackground from './src/components/ItalianTableclothBackground';
import { AuthProvider } from './src/data/AuthContext';
import { RecipesProvider } from './src/data/RecipesContext';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  return (
    <ItalianTableclothBackground>
      <AuthProvider>
        <RecipesProvider>
          <AppNavigator />
        </RecipesProvider>
      </AuthProvider>
    </ItalianTableclothBackground>
  );
}