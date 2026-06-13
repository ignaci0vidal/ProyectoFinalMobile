import React, { useState } from 'react';
import {
  Alert,
  Image,
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import ItalianTableclothBackground from '../components/ItalianTableclothBackground';
import { useAuth } from '../data/AuthContext';

const upcomingRecipePacks = [
  'Recetas sin TACC',
  'Salsas',
  'Postres',
  'Arroces',
  'Pescados',
  'Ensaladas',
  'Comida thai',
];

const SettingsScreen: React.FC = () => {
  const { currentUser, logout, updateProfile } = useAuth();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [name, setName] = useState(currentUser?.name ?? '');
  const [email, setEmail] = useState(currentUser?.email ?? '');
  const [password, setPassword] = useState('');

  const handleLogout = () => {
    setShowLogoutModal(true);
  };

  const handleUpcomingPackPress = (packName: string) => {
    Alert.alert('Próximamente', `${packName} estará disponible en una próxima versión.`);
  };

  const openEditModal = () => {
    setName(currentUser?.name ?? '');
    setEmail(currentUser?.email ?? '');
    setPassword('');
    setShowEditModal(true);
  };

  const handleSaveProfile = () => {
    const wasUpdated = updateProfile({
      name,
      email,
      password,
    });

    if (wasUpdated) {
      setShowEditModal(false);
      setPassword('');
    }
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
              Administrá tu perfil y las opciones de sesión.
            </Text>
          </View>

          <View style={styles.infoBox}>
            <Text style={styles.infoTitle}>Perfil</Text>

            <Text style={styles.label}>Nombre</Text>
            <Text style={styles.infoText}>{currentUser?.name}</Text>

            <Text style={styles.label}>Email</Text>
            <Text style={styles.infoText}>{currentUser?.email}</Text>

            <Text style={styles.label}>Rol</Text>
            <Text style={styles.infoText}>
              {currentUser?.role === 'admin' ? 'Administrador' : 'Usuario'}
            </Text>

            <TouchableOpacity style={styles.editProfileButton} onPress={openEditModal}>
              <Text style={styles.editProfileButtonText}>Editar perfil</Text>
            </TouchableOpacity>
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
              miKitchen guarda recetas propias, fotos, favoritos y datos de usuario
              de forma local en este dispositivo.
            </Text>
          </View>

          <View style={styles.infoBox}>
            <Text style={styles.infoTitle}>Elementos nativos incluidos</Text>
            <Text style={styles.infoText}>• Cámara o galería para foto de receta</Text>
            <Text style={styles.infoText}>• Feedback háptico al guardar acciones</Text>
            <Text style={styles.infoText}>• Timer de cocción con alerta</Text>
          </View>

          <View style={[styles.infoBox, styles.upcomingBox]}>
            <Text style={[styles.infoTitle, styles.upcomingTitle]}>Próximamente</Text>
            <Text style={[styles.infoText, styles.upcomingDescription]}>
              Packs temáticos para ampliar tu recetario.
            </Text>

            <View style={styles.upcomingPacksGrid}>
              {upcomingRecipePacks.map((packName) => (
                <TouchableOpacity
                  key={packName}
                  style={styles.upcomingPackButton}
                  onPress={() => handleUpcomingPackPress(packName)}
                >
                  <Text style={styles.upcomingPackButtonText}>{packName}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </ScrollView>

        <Modal
          visible={showEditModal}
          transparent
          animationType="fade"
          onRequestClose={() => setShowEditModal(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalCard}>
              <Text style={styles.modalTitle}>Editar perfil</Text>
              <Text style={styles.modalText}>
                Actualizá tus datos. Dejá la contraseña vacía si no querés cambiarla.
              </Text>

              <Text style={styles.inputLabel}>Nombre</Text>
              <TextInput
                value={name}
                onChangeText={setName}
                placeholder="Tu nombre"
                style={styles.input}
              />

              <Text style={styles.inputLabel}>Email</Text>
              <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder="tu@email.com"
                autoCapitalize="none"
                keyboardType="email-address"
                style={styles.input}
              />

              <Text style={styles.inputLabel}>Nueva contraseña</Text>
              <TextInput
                value={password}
                onChangeText={setPassword}
                placeholder="Opcional"
                autoCapitalize="none"
                secureTextEntry
                style={styles.input}
              />

              <View style={styles.modalActions}>
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={() => setShowEditModal(false)}
                >
                  <Text style={styles.cancelButtonText}>Cancelar</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.confirmButton}
                  onPress={handleSaveProfile}
                >
                  <Text style={styles.confirmButtonText}>Guardar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

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
  editProfileButton: {
    backgroundColor: '#2f6f4e',
    borderRadius: 14,
    paddingVertical: 13,
    alignItems: 'center',
    marginTop: 16,
  },
  editProfileButtonText: {
    color: '#ffffff',
    fontSize: 15,
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
  inputLabel: {
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
    color: '#2b2d42',
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
  upcomingPacksGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 14,
    marginTop: 18,
  },
  upcomingBox: {
    backgroundColor: 'rgba(255, 244, 230, 0.97)',
    padding: 20,
  },
  upcomingTitle: {
    textAlign: 'center',
    marginBottom: 8,
  },
  upcomingDescription: {
    textAlign: 'center',
    marginBottom: 2,
  },
  upcomingPackButton: {
    width: '30.5%',
    aspectRatio: 1,
    backgroundColor: '#fffaf2',
    borderWidth: 1,
    borderColor: '#ead8ca',
    borderBottomWidth: 5,
    borderBottomColor: '#d8c8bb',
    borderRadius: 16,
    paddingHorizontal: 8,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.16,
    shadowRadius: 6,
    elevation: 5,
  },
  upcomingPackButtonText: {
    color: '#2b2d42',
    fontSize: 13,
    fontWeight: '900',
    lineHeight: 17,
    textAlign: 'center',
  },
  titleLogo: {
    width: 54,
    height: 54,
    resizeMode: 'contain',
  },
});

export default SettingsScreen;
