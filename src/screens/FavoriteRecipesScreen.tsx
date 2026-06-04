import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import {
    FlatList,
    SafeAreaView,
    StyleSheet,
    Text,
    View,
} from 'react-native';

import EmptyState from '../components/EmptyState';
import ItalianTableclothBackground from '../components/ItalianTableclothBackground';
import RecipeCard from '../components/RecipeCard';
import { useRecipes } from '../data/RecipesContext';
import { RecipeStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RecipeStackParamList, 'FavoriteRecipes'>;

const FavoriteRecipesScreen: React.FC<Props> = ({ navigation }) => {
    const { recipes } = useRecipes();

    const favoriteRecipes = recipes.filter((recipe) => recipe.isFavorite);

    return (
        <ItalianTableclothBackground>
            <SafeAreaView style={styles.screen}>
                <View style={styles.headerContent}>
                    <Text style={styles.title}>Recetas favoritas</Text>
                    <Text style={styles.subtitle}>
                        Tus recetas marcadas como favoritas para encontrarlas más rápido.
                    </Text>
                </View>

                <FlatList
                    data={favoriteRecipes}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={styles.listContent}
                    ListEmptyComponent={
                        <EmptyState message="Todavía no marcaste recetas como favoritas." />
                    }
                    renderItem={({ item }) => (
                        <RecipeCard
                            recipe={item}
                            onPress={() =>
                                navigation.navigate('RecipeDetail', { recipeId: item.id })
                            }
                        />
                    )}
                />
            </SafeAreaView>
        </ItalianTableclothBackground>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: 'transparent',
        paddingTop: 16,
    },
    headerContent: {
        paddingHorizontal: 16,
        marginBottom: 12,
    },
    title: {
        fontSize: 26,
        fontWeight: '800',
        color: '#2b2d42',
        marginBottom: 6,
    },
    subtitle: {
        fontSize: 15,
        color: '#555',
        lineHeight: 21,
    },
    listContent: {
        paddingBottom: 24,
    },
});

export default FavoriteRecipesScreen;