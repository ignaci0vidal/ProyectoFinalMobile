import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Recipe } from '../types/recipe';
import TableclothCard from './TableclothCard';

type Props = {
  recipe: Recipe;
  onPress: () => void;
};

const RecipeCard: React.FC<Props> = ({ recipe, onPress }) => {
  return (
    <TouchableOpacity
      style={styles.touchable}
      onPress={onPress}
      activeOpacity={0.86}
    >
      <TableclothCard contentStyle={styles.cardContent}>
        {recipe.imageUri || recipe.imageSource ? (
          <Image
            source={recipe.imageUri ? { uri: recipe.imageUri } : recipe.imageSource}
            style={styles.image}
          />
        ) : (
          <View style={styles.imagePlaceholder}>
            <Ionicons name="restaurant-outline" size={28} color="#999" />
          </View>
        )}

        <View style={styles.content}>
          <Text style={styles.title}>{recipe.title}</Text>
          <Text style={styles.category}>{recipe.category}</Text>
          <Text style={styles.description} numberOfLines={2}>
            {recipe.description || 'Sin descripción'}
          </Text>
          <Text style={styles.time}>{recipe.cookingTime} min</Text>
        </View>

        {recipe.isFavorite && (
          <Ionicons name="heart" size={22} color="#e63946" />
        )}
      </TableclothCard>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  touchable: {
    width: '100%',
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 72,
    height: 72,
    borderRadius: 14,
    marginRight: 12,
  },
  imagePlaceholder: {
    width: 72,
    height: 72,
    borderRadius: 14,
    marginRight: 12,
    backgroundColor: 'rgba(244, 236, 228, 0.9)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 17,
    fontWeight: '800',
    color: '#2b2d42',
  },
  category: {
    fontSize: 13,
    color: '#b7352d',
    fontWeight: '700',
    marginTop: 2,
  },
  description: {
    fontSize: 13,
    color: '#555',
    marginTop: 4,
  },
  time: {
    marginTop: 6,
    fontSize: 12,
    color: '#555',
    fontWeight: '700',
  },
});

export default RecipeCard;