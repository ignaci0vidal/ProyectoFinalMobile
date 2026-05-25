import React from 'react';
import { RecipesProvider } from './data/RecipesContext';
import AppNavigator from './navigation/AppNavigator';

const App: React.FC = () => {
  return (
    <RecipesProvider>
      <AppNavigator />
    </RecipesProvider>
  );
};

export default App;