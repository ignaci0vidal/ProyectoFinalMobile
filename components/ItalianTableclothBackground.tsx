import React from 'react';
import {
    ImageBackground,
    StyleSheet,
    View,
} from 'react-native';

type Props = {
    children: React.ReactNode;
};

const ItalianTableclothBackground: React.FC<Props> = ({ children }) => {
    return (
        <ImageBackground
            source={require('../assets/italian-tablecloth.png')}
            style={styles.background}
            resizeMode="repeat"
        >
            <View style={styles.overlay}>
                {children}
            </View>
        </ImageBackground>
    );
};

export default ItalianTableclothBackground;

const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: '100%',
        alignSelf: 'stretch',
    },
    overlay: {
        flex: 1,
        width: '100%',
        backgroundColor: 'rgba(255, 248, 237, 0.72)',
    },
});