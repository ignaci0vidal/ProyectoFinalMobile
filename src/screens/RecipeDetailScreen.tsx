import React from 'react';
import { SafeAreaView, Text } from 'react-native';
import ItalianTableclothBackground from '../components/ItalianTableclothBackground';

const RecipeDetailScreen: React.FC = () => {
  return (
    <ItalianTableclothBackground>
      <SafeAreaView>
        <Text>Detalle de receta</Text>
      </SafeAreaView>
    </ItalianTableclothBackground>
  );
};

export default RecipeDetailScreen;