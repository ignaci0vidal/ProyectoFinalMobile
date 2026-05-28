import React, { useState } from 'react';
import {
    Alert,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import ItalianTableclothBackground from '../components/ItalianTableclothBackground';
import { useAuth } from '../data/AuthContext';

type Props = {
    onGoToLogin: () => void;
};

const SignupScreen: React.FC<Props> = ({ onGoToLogin }) => {
    const { signup } = useAuth();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignup = () => {
        if (!name.trim() || !email.trim() || !password.trim()) {
            Alert.alert('Error', 'Completá todos los campos.');
            return;
        }

        signup({ name, email, password });
    };

    return (
        <ItalianTableclothBackground>
            <SafeAreaView style={styles.screen}>
                <View style={styles.card}>
                    <Text style={styles.logo}>miKitchen</Text>
                    <Text style={styles.title}>Crear cuenta</Text>
                    <Text style={styles.subtitle}>
                        Registrate para guardar tus propias recetas.
                    </Text>

                    <Text style={styles.label}>Nombre</Text>
                    <TextInput
                        value={name}
                        onChangeText={setName}
                        placeholder="Tu nombre"
                        style={styles.input}
                    />

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

                    <TouchableOpacity style={styles.primaryButton} onPress={handleSignup}>
                        <Text style={styles.primaryButtonText}>Crear cuenta</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.secondaryButton} onPress={onGoToLogin}>
                        <Text style={styles.secondaryButtonText}>
                            Ya tengo usuario
                        </Text>
                    </TouchableOpacity>
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
        fontSize: 34,
        fontWeight: '900',
        color: '#22223b',
        marginBottom: 6,
    },
    title: {
        fontSize: 24,
        fontWeight: '800',
        color: '#2b2d42',
    },
    subtitle: {
        fontSize: 15,
        color: '#555',
        marginTop: 6,
        marginBottom: 20,
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
});

export default SignupScreen;