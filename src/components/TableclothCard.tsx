import React from 'react';
import {
    ImageBackground,
    StyleSheet,
    View,
    ViewStyle,
} from 'react-native';

type Props = {
    children: React.ReactNode;
    style?: ViewStyle;
    contentStyle?: ViewStyle;
};

const TableclothCard: React.FC<Props> = ({ children, style, contentStyle }) => {
    return (
        <ImageBackground
            source={require('../assets/italian-tablecloth.png')}
            style={[styles.card, style]}
            imageStyle={styles.image}
            resizeMode="repeat"
        >
            <View style={[styles.overlay, contentStyle]}>
                {children}
            </View>
        </ImageBackground>
    );
};

export default TableclothCard;

const styles = StyleSheet.create({
    card: {
        borderRadius: 18,
        overflow: 'hidden',
        marginBottom: 12,
        borderWidth: 1,
        borderColor: 'rgba(120, 40, 30, 0.18)',
        elevation: 3,
        shadowColor: '#000',
        shadowOpacity: 0.12,
        shadowRadius: 6,
        shadowOffset: {
            width: 0,
            height: 3,
        },
    },
    image: {
        borderRadius: 18,
    },
    overlay: {
        padding: 12,
        backgroundColor: 'rgba(255, 250, 242, 0.88)',
    },
});