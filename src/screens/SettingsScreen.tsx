import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import ItalianTableclothBackground from '../components/ItalianTableclothBackground';
import { useAuth } from '../data/AuthContext';

const SettingsScreen: React.FC = () => {
  const { currentUser, logout } = useAuth();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogout = () => {
    setShowLogoutModal(true);
  };

  const confirmLogout = () => {
    setShowLogoutModal(false);
    logout();
  };

  return (
    <ItalianTableclothBackground>
      <SafeAreaView style={styles.screen}>
        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.title}>Ajustes</Text>

          <View style={styles.infoBox}>
            <View style={styles.infoHeader}>
              <Ionicons name="person-circle-outline" size={24} color="#e76f51" />
              <Text style={styles.infoTitle}>Usuario actual</Text>
            </View>

            <Text style={styles.label}>Nombre</Text>
            <Text style={styles.infoText}>
              {currentUser?.name ?? 'Sin nombre cargado'}
            </Text>

            <Text style={styles.label}>Email</Text>
            <Text style={styles.infoText}>
              {currentUser?.email ?? 'Sin email cargado'}
            </Text>

            <Text style={styles.label}>Rol</Text>
            <Text style={styles.infoText}>
              {currentUser?.role === 'admin' ? 'Administrador' : 'Usuario'}
            </Text>
          </View>

          <View style={styles.infoBox}>
            <View style={styles.infoHeader}>
              <Ionicons name="restaurant-outline" size={22} color="#e76f51" />
              <Text style={styles.infoTitle}>miKitchen</Text>
            </View>

            <Text style={styles.infoText}>
              Aplicación desarrollada como Trabajo Práctico Integrador de
              Desarrollo de Aplicaciones para Dispositivos Móviles.
            </Text>
          </View>

          <View style={styles.infoBox}>
            <View style={styles.infoHeader}>
              <Ionicons name="code-slash-outline" size={22} color="#e76f51" />
              <Text style={styles.infoTitle}>Tecnologías</Text>
            </View>

            <Text style={styles.infoText}>• React Native</Text>
            <Text style={styles.infoText}>• Expo</Text>
            <Text style={styles.infoText}>• TypeScript</Text>
            <Text style={styles.infoText}>• React Navigation</Text>
            <Text style={styles.infoText}>• Context API</Text>
          </View>

          <View style={styles.infoBox}>
            <View style={styles.infoHeader}>
              <Ionicons name="information-circle-outline" size={22} color="#e76f51" />
              <Text style={styles.infoTitle}>Alcance del proyecto</Text>
            </View>

            <Text style={styles.infoText}>
              Las recetas se administran en memoria usando estado global con
              Context API. Esto permite crear, editar, eliminar y marcar recetas
              como favoritas durante la sesión de uso.
            </Text>
          </View>

          <TouchableOpacity
            style={styles.logoutButton}
            onPress={handleLogout}
            activeOpacity={0.85}
          >
            <Ionicons name="log-out-outline" size={20} color="#ffffff" />
            <Text style={styles.logoutButtonText}>Cerrar sesión</Text>
          </TouchableOpacity>
        </ScrollView>

        <Modal
          visible={showLogoutModal}
          transparent
          animationType="fade"
          onRequestClose={() => setShowLogoutModal(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalCard}>
              <View style={styles.modalIcon}>
                <Ionicons name="log-out-outline" size={30} color="#e76f51" />
              </View>

              <Text style={styles.modalTitle}>Cerrar sesión</Text>

              <Text style={styles.modalText}>
                ¿Querés salir de tu cuenta? Vas a volver a la pantalla de inicio
                de sesión.
              </Text>

              <View style={styles.modalActions}>
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={() => setShowLogoutModal(false)}
                  activeOpacity={0.85}
                >
                  <Text style={styles.cancelButtonText}>Cancelar</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.confirmButton}
                  onPress={confirmLogout}
                  activeOpacity={0.85}
                >
                  <Text style={styles.confirmButtonText}>Cerrar sesión</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </ItalianTableclothBackground>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  content: {
    width: '100%',
    maxWidth: 920,
    alignSelf: 'center',
    paddingHorizontal: 16,
    paddingTop: 32,
    paddingBottom: 40,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: '#2b2d42',
    marginBottom: 16,
  },
  infoBox: {
    backgroundColor: 'rgba(255, 250, 242, 0.94)',
    padding: 16,
    borderRadius: 18,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#f0dfd2',
  },
  infoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 10,
  },
  infoTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: '#2b2d42',
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
    justifyContent: 'center',
    marginTop: 4,
    flexDirection: 'row',
    gap: 8,
  },
  logoutButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '900',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.38)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  modalCard: {
    width: '100%',
    maxWidth: 420,
    backgroundColor: '#fffaf2',
    borderRadius: 22,
    padding: 20,
    borderWidth: 1,
    borderColor: '#f0dfd2',
  },
  modalIcon: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: '#fff3ed',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#f0dfd2',
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: '#2b2d42',
    marginBottom: 8,
  },
  modalText: {
    fontSize: 15,
    color: '#555',
    lineHeight: 22,
    marginBottom: 18,
  },
  modalActions: {
    flexDirection: 'row',
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#e76f51',
    borderRadius: 14,
    paddingVertical: 13,
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  cancelButtonText: {
    color: '#e76f51',
    fontSize: 15,
    fontWeight: '900',
  },
  confirmButton: {
    flex: 1,
    backgroundColor: '#e76f51',
    borderRadius: 14,
    paddingVertical: 13,
    alignItems: 'center',
  },
  confirmButtonText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '900',
  },
});

export default SettingsScreen;