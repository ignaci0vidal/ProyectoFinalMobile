import React, { useState } from 'react';
import {
    Alert,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    Image,
} from 'react-native';
import ItalianTableclothBackground from '../components/ItalianTableclothBackground';
import { useAuth } from '../data/AuthContext';

type Props = {
    onGoToSignup: () => void;
};

const LoginScreen: React.FC<Props> = ({ onGoToSignup }) => {
    const { login } = useAuth();

    const [email, setEmail] = useState('admin@mikitchen.com');
    const [password, setPassword] = useState('123456');

    const handleLogin = () => {
        if (!email.trim() || !password.trim()) {
            Alert.alert('Error', 'Completá email y contraseña.');
            return;
        }

        login(email, password);
    };

    return (
        <ItalianTableclothBackground>
            <SafeAreaView style={styles.screen}>
                <View style={styles.card}>
                    <Image
                        source={require('../assets/logo.png')}
                        style={styles.logo}
                    />
                    <Text style={styles.title}>Iniciar sesión</Text>
                    <Text style={styles.subtitle}>
                        Entrá con tu usuario para ver tus recetas.
                    </Text>

                    <Text style={styles.label}>Email</Text>
                    <TextInput
                        value={email}
                        onChangeText={setEmail}
                        placeholder="tu@email.com"
                        autoCapitalize="none"
                        keyboardType="email-address"
                        style={styles.input}
                    />

                    <Text style={styles.label}>Contraseña</Text>
                    <TextInput
                        value={password}
                        onChangeText={setPassword}
                        placeholder="mínimo 6 caracteres"
                        secureTextEntry
                        style={styles.input}
                    />

                    <TouchableOpacity style={styles.primaryButton} onPress={handleLogin}>
                        <Text style={styles.primaryButtonText}>Ingresar</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.secondaryButton} onPress={onGoToSignup}>
                        <Text style={styles.secondaryButtonText}>
                            Crear usuario nuevo
                        </Text>
                    </TouchableOpacity>

                    <View style={styles.demoBox}>
                        <Text style={styles.demoTitle}>Usuarios demo</Text>
                        <Text style={styles.demoText}>Admin: admin@mikitchen.com</Text>
                        <Text style={styles.demoText}>Demo: demo@mikitchen.com</Text>
                        <Text style={styles.demoText}>Contraseña: 123456</Text>
                    </View>
                </View>
            </SafeAreaView>
        </ItalianTableclothBackground>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        padding: 24,
        backgroundColor: 'transparent',
    },
    card: {
        backgroundColor: 'rgba(255, 250, 242, 0.92)',
        borderRadius: 24,
        padding: 22,
        borderWidth: 1,
        borderColor: '#f0dfd2',
    },
    logo: {
        width: 345,
        height: 217
        ,
        resizeMode: 'contain',
        alignSelf: 'center',
        marginBottom: 12,
    },
    title: {
        fontSize: 24,
        fontWeight: '800',
        color: '#2b2d42',
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 15,
        color: '#555',
        marginTop: 6,
        marginBottom: 20,
        textAlign: 'center',
    },
    label: {
        fontSize: 14,
        fontWeight: '800',
        color: '#2b2d42',
        marginBottom: 6,
    },
    input: {
        backgroundColor: '#ffffff',
        borderWidth: 1,
        borderColor: '#ead8ca',
        borderRadius: 14,
        paddingHorizontal: 14,
        paddingVertical: 12,
        marginBottom: 14,
        fontSize: 15,
    },
    primaryButton: {
        backgroundColor: '#e76f51',
        borderRadius: 16,
        paddingVertical: 14,
        alignItems: 'center',
        marginTop: 4,
    },
    primaryButtonText: {
        color: '#ffffff',
        fontWeight: '900',
        fontSize: 16,
    },
    secondaryButton: {
        borderWidth: 1,
        borderColor: '#e76f51',
        borderRadius: 16,
        paddingVertical: 14,
        alignItems: 'center',
        marginTop: 12,
        backgroundColor: '#ffffff',
    },
    secondaryButtonText: {
        color: '#e76f51',
        fontWeight: '900',
        fontSize: 15,
    },
    demoBox: {
        marginTop: 18,
        padding: 12,
        borderRadius: 14,
        backgroundColor: 'rgba(255, 255, 255, 0.72)',
    },
    demoTitle: {
        fontWeight: '900',
        color: '#2b2d42',
        marginBottom: 4,
    },
    demoText: {
        color: '#555',
        fontSize: 13,
        marginTop: 2,
    },

});

export default LoginScreen;