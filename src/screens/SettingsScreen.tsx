import React, { useState } from 'react';
import {
  Image,
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
          style={styles.scroll}
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.titleCard}>
            <Text style={styles.title}>Ajustes</Text>
            <Image
              source={require('../assets/mk-logo.png')}
              style={styles.titleLogo}
            />
          </View>

          <View style={styles.descriptionCard}>
            <Text style={styles.description}>
              Revisá tu usuario, la información de la app y las opciones de sesión.
            </Text>
          </View>

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

          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutButtonText}>Cerrar sesión</Text>
          </TouchableOpacity>

          {currentUser?.role === 'admin' && (
            <View style={styles.infoBox}>
              <Text style={styles.infoTitle}>Panel administrador</Text>
              <Text style={styles.infoText}>
                En una próxima versión, este rol podría gestionar packs de recetas,
                contenido destacado y usuarios registrados.
              </Text>
            </View>
          )}

          <View style={styles.infoBox}>
            <Text style={styles.infoTitle}>Acerca de miKitchen</Text>
            <Text style={styles.infoText}>
              Aplicación desarrollada como Trabajo Práctico Integrador de Desarrollo
              de Aplicaciones para Dispositivos Móviles.
            </Text>
          </View>

          <View style={styles.infoBox}>
            <Text style={styles.infoTitle}>Objetivo de la app</Text>
            <Text style={styles.infoText}>
              Guardar recetas propias, organizarlas por categoría, documentarlas con
              foto y usar un timer simple durante la cocción.
            </Text>
          </View>

          <View style={styles.infoBox}>
            <Text style={styles.infoTitle}>Próximas incorporaciones</Text>

            <Text style={styles.infoText}>
              en miKitchen podrás comprar packs de recetas, como:
            </Text>

            <Text style={styles.bulletItem}>• Cocina sin TACC</Text>
            <Text style={styles.bulletItem}>• Cenas románticas</Text>
            <Text style={styles.bulletItem}>• Comida china casera</Text>
            <Text style={styles.bulletItem}>• Pastelería profesional</Text>

            <Text style={styles.packsFinalText}>
              Cada pack ofrecería recetas guiadas con ingredientes, pasos, fotos,
              categorías, tiempos de cocción y timer integrado.
            </Text>
          </View>

          <View style={styles.infoBox}>
            <Text style={styles.infoTitle}>Elementos nativos incluidos</Text>
            <Text style={styles.infoText}>• Cámara o galería para foto de receta</Text>
            <Text style={styles.infoText}>• Feedback háptico al guardar acciones</Text>
            <Text style={styles.infoText}>• Timer de cocción con alerta</Text>
          </View>

          <View style={styles.infoBox}>
            <Text style={styles.infoTitle}>Tecnologías</Text>
            <Text style={styles.infoText}>• React Native</Text>
            <Text style={styles.infoText}>• Expo</Text>
            <Text style={styles.infoText}>• TypeScript</Text>
            <Text style={styles.infoText}>• React Navigation</Text>
            <Text style={styles.infoText}>• Context API para usuarios y recetas</Text>
          </View>


        </ScrollView>

        <Modal
          visible={showLogoutModal}
          transparent
          animationType="fade"
          onRequestClose={() => setShowLogoutModal(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalCard}>
              <Text style={styles.modalTitle}>Cerrar sesión</Text>
              <Text style={styles.modalText}>
                ¿Querés salir de tu cuenta?
              </Text>

              <View style={styles.modalActions}>
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={() => setShowLogoutModal(false)}
                >
                  <Text style={styles.cancelButtonText}>Cancelar</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.confirmButton}
                  onPress={confirmLogout}
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
  scroll: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 32,
    paddingTop: 32,
    paddingBottom: 120,
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
    backgroundColor: '#e96a50',
    borderRadius: 14,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 0,
    marginBottom: 26,
  },
  logoutButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '900',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  modalCard: {
    width: '100%',
    backgroundColor: '#fffaf2',
    borderRadius: 22,
    padding: 20,
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
  headerCard: {
    backgroundColor: 'rgba(255, 250, 242, 0.94)',
    padding: 22,
    borderRadius: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#f0dfd2',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.12,
    shadowRadius: 5,

    elevation: 3,
  },
  subtitle: {
    marginTop: 8,
    fontSize: 16,
    lineHeight: 22,
    color: '#555',
    fontWeight: '600',
  },
  titleCard: {
    backgroundColor: 'rgba(255, 244, 230, 0.96)',
    paddingVertical: 18,
    paddingHorizontal: 22,
    borderRadius: 20,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#f0dfd2',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.12,
    shadowRadius: 5,

    elevation: 3,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  descriptionCard: {
    backgroundColor: 'rgba(255, 250, 242, 0.94)',
    padding: 16,
    borderRadius: 18,
    marginBottom: 22,
    borderWidth: 1,
    borderColor: '#f0dfd2',
  },
  title: {
    fontSize: 30,
    fontWeight: '800',
    color: '#2b2d42',
  },
  description: {
    fontSize: 16,
    lineHeight: 22,
    color: '#555',
    fontWeight: '600',
  },
  bulletItem: {
    fontSize: 15,
    color: '#555',
    lineHeight: 22,
    marginLeft: 8,
    marginTop: 2,
  },
  packsFinalText: {
    fontSize: 15,
    color: '#555',
    lineHeight: 21,
    marginTop: 10,
  },
  titleLogo: {
    width: 54,
    height: 54,
    resizeMode: 'contain',
  },
});

export default SettingsScreen;