import React from 'react';
import {
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import ItalianTableclothBackground from '../components/ItalianTableclothBackground';
import { useAuth } from '../data/AuthContext';

const SettingsScreen: React.FC = () => {
  const { currentUser, logout } = useAuth();

  const handleLogout = () => {
    Alert.alert(
      'Cerrar sesión',
      '¿Querés salir de tu cuenta?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Cerrar sesión',
          style: 'destructive',
          onPress: logout,
        },
      ]
    );
  };

  return (
    <ItalianTableclothBackground>
      <SafeAreaView style={styles.screen}>
        <Text style={styles.title}>Ajustes</Text>

        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>Usuario actual</Text>

          <Text style={styles.label}>Nombre</Text>
          <Text style={styles.infoText}>{currentUser?.name}</Text>

          <Text style={styles.label}>Email</Text>
          <Text style={styles.infoText}>{currentUser?.email}</Text>

          <Text style={styles.label}>Rol</Text>
          <Text style={styles.infoText}>
            {currentUser?.role === 'admin' ? 'Administrador' : 'Usuario'}
          </Text>
        </View>

        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>miKitchen</Text>
          <Text style={styles.infoText}>
            Aplicación desarrollada como Trabajo Práctico Integrador de Desarrollo
            de Aplicaciones para Dispositivos Móviles.
          </Text>
        </View>

        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>Tecnologías</Text>
          <Text style={styles.infoText}>• React Native</Text>
          <Text style={styles.infoText}>• Expo</Text>
          <Text style={styles.infoText}>• TypeScript</Text>
          <Text style={styles.infoText}>• React Navigation</Text>
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Cerrar sesión</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </ItalianTableclothBackground>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: 'transparent',
    padding: 16,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: '#2b2d42',
    marginBottom: 16,
    marginLeft: 16,
  },
  infoBox: {
    backgroundColor: 'rgba(255, 250, 242, 0.94)',
    padding: 16,
    borderRadius: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#f0dfd2',
  },
  infoTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: '#2b2d42',
    marginBottom: 10,
  },
  label: {
    fontSize: 13,
    fontWeight: '800',
    color: '#e76f51',
    marginTop: 8,
    marginBottom: 2,
  },
  infoText: {
    fontSize: 15,
    color: '#555',
    lineHeight: 21,
  },
  logoutButton: {
    backgroundColor: '#e76f51',
    paddingVertical: 15,
    borderRadius: 16,
    alignItems: 'center',
    marginTop: 4,
  },
  logoutButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '900',
  },
});

export default SettingsScreen;