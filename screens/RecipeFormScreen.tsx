import React from 'react';
import { SafeAreaView, Text } from 'react-native';

type Props = {
  mode?: 'create' | 'edit';
};

const RecipeFormScreen: React.FC<Props> = ({ mode = 'create' }) => {
  return (
    <SafeAreaView>
      <Text>{mode === 'create' ? 'Nueva receta' : 'Editar receta'}</Text>
    </SafeAreaView>
  );
};

export default RecipeFormScreen;