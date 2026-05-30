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
        {recipe.imageUri ? (
          <Image source={{ uri: recipe.imageUri }} style={styles.image} />
        ) : (
          <View style={styles.imagePlaceholder}>
            <Ionicons name="restaurant-outline" size={30} color="#b7352d" />
          </View>
        )}

        <View style={styles.content}>
          <View style={styles.titleRow}>
            <Text style={styles.title} numberOfLines={1}>
              {recipe.title}
            </Text>

            <Ionicons
              name={recipe.isFavorite ? 'heart' : 'heart-outline'}
              size={21}
              color={recipe.isFavorite ? '#e63946' : '#c8b8ad'}
            />
          </View>

          <View style={styles.categoryBadge}>
            <Text style={styles.categoryText} numberOfLines={1}>
              {recipe.category}
            </Text>
          </View>

          <Text style={styles.description} numberOfLines={2}>
            {recipe.description || 'Sin descripción cargada.'}
          </Text>

          <View style={styles.footerRow}>
            <View style={styles.timeContainer}>
              <Ionicons name="timer-outline" size={16} color="#e76f51" />
              <Text style={styles.time}>{recipe.cookingTime} min</Text>
            </View>

            <View style={styles.detailContainer}>
              <Text style={styles.detailText}>Ver detalle</Text>
              <Ionicons name="chevron-forward" size={16} color="#777" />
            </View>
          </View>
        </View>
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
    gap: 12,
  },
  image: {
    width: 76,
    height: 76,
    borderRadius: 16,
    backgroundColor: '#f4ece4',
  },
  imagePlaceholder: {
    width: 76,
    height: 76,
    borderRadius: 16,
    backgroundColor: 'rgba(244, 236, 228, 0.95)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#f0dfd2',
  },
  content: {
    flex: 1,
    minWidth: 0,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  title: {
    flex: 1,
    fontSize: 17,
    fontWeight: '800',
    color: '#2b2d42',
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#fff3ed',
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginTop: 6,
    borderWidth: 1,
    borderColor: '#f0dfd2',
  },
  categoryText: {
    fontSize: 12,
    color: '#b7352d',
    fontWeight: '800',
  },
  description: {
    fontSize: 13,
    color: '#555',
    marginTop: 7,
    lineHeight: 18,
  },
  footerRow: {
    marginTop: 9,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  time: {
    fontSize: 12,
    color: '#555',
    fontWeight: '800',
  },
  detailContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  detailText: {
    fontSize: 12,
    color: '#777',
    fontWeight: '700',
  },
});

export default RecipeCard;