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
import { useRecipes } from '../data/RecipesContext';

const upcomingRecipePacks = [
  'Recetas sin TACC',
  'Salsas',
  'Postres',
  'Arroces',
  'Pescados',
  'Ensaladas',
  'Comida thai',
];

const saucePackRecipes = [
  {
    title: 'Salsa bechamel',
    category: 'Salsas',
    description:
      'Salsa blanca clásica a base de roux, leche y nuez moscada. Ideal para gratinados, pastas y verduras.',
    ingredients:
      'Manteca: 50 g\nHarina 0000: 50 g\nLeche: 500 ml\nSal fina: a gusto\nPimienta blanca: a gusto\nNuez moscada: a gusto',
    steps:
      '1- Derretir la manteca en una cacerola a fuego bajo.\n2- Agregar la harina y cocinar mezclando durante 2 minutos, sin que tome color.\n3- Incorporar la leche de a poco, batiendo para evitar grumos.\n4- Cocinar hasta que espese y tenga textura lisa.\n5- Condimentar con sal, pimienta blanca y nuez moscada.',
    cookingTime: 15,
    isFavorite: false,
  },
  {
    title: 'Salsa bolognesa',
    category: 'Salsas',
    description:
      'Salsa de carne cocida lentamente con vegetales, tomate y vino. Perfecta para pastas rellenas o largas.',
    ingredients:
      'Carne picada: 500 g\nCebolla: 1 u\nZanahoria: 1 u\nApio: 1 rama\nAjo: 1 diente\nTomate triturado: 500 ml\nVino tinto: 100 ml\nAceite de oliva: a gusto\nSal fina: a gusto\nPimienta: a gusto',
    steps:
      '1- Picar cebolla, zanahoria, apio y ajo bien pequeños.\n2- Rehogar los vegetales con aceite de oliva hasta que estén tiernos.\n3- Agregar la carne picada y dorar mezclando.\n4- Incorporar el vino y dejar evaporar el alcohol.\n5- Sumar el tomate triturado y cocinar a fuego bajo hasta concentrar.\n6- Ajustar sal y pimienta antes de servir.',
    cookingTime: 70,
    isFavorite: false,
  },
  {
    title: 'Pesto genovés',
    category: 'Salsas',
    description:
      'Salsa fresca de albahaca, ajo, queso, frutos secos y aceite de oliva. Rápida, aromática y versátil.',
    ingredients:
      'Albahaca fresca: 2 tazas\nAjo: 1 diente\nPiñones o nueces: 40 g\nQueso parmesano rallado: 60 g\nAceite de oliva: 120 ml\nSal fina: a gusto',
    steps:
      '1- Lavar y secar muy bien las hojas de albahaca.\n2- Procesar o machacar albahaca, ajo, frutos secos y sal.\n3- Agregar el queso rallado.\n4- Incorporar el aceite de oliva de a poco hasta obtener una salsa cremosa.\n5- Ajustar sal y usar sin calentar para conservar el color y aroma.',
    cookingTime: 10,
    isFavorite: false,
  },
  {
    title: 'Salsa holandesa',
    category: 'Salsas',
    description:
      'Emulsión tibia de yemas, manteca y limón. Clásica para huevos, pescados, vegetales y preparaciones delicadas.',
    ingredients:
      'Yemas: 3 u\nManteca clarificada o derretida: 180 g\nJugo de limón: 1 cda\nAgua: 1 cda\nSal fina: a gusto\nPimienta blanca: a gusto',
    steps:
      '1- Colocar las yemas con agua en un bowl resistente al calor.\n2- Batir sobre baño María suave hasta que espumen y espesen.\n3- Agregar la manteca tibia en forma de hilo, batiendo constantemente.\n4- Retirar del calor y sumar jugo de limón.\n5- Condimentar con sal y pimienta blanca. Mantener tibia, sin hervir.',
    cookingTime: 15,
    isFavorite: false,
  },
];

const upcomingRecipePackRows = [
  upcomingRecipePacks.slice(0, 3),
  upcomingRecipePacks.slice(3, 6),
  upcomingRecipePacks.slice(6),
];

const SettingsScreen: React.FC = () => {
  const { currentUser, logout, updateProfile } = useAuth();
  const { recipes, addRecipe } = useRecipes();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showPackAddedModal, setShowPackAddedModal] = useState(false);
  const [addedSauceRecipesCount, setAddedSauceRecipesCount] = useState(0);
  const [name, setName] = useState(currentUser?.name ?? '');
  const [email, setEmail] = useState(currentUser?.email ?? '');
  const [password, setPassword] = useState('');

  const handleLogout = () => {
    setShowLogoutModal(true);
  };

  const handleUpcomingPackPress = async (packName: string) => {
    if (packName === 'Salsas') {
      const existingRecipeTitles = new Set(
        recipes.map((recipe) => recipe.title.trim().toLowerCase())
      );
      const recipesToAdd = saucePackRecipes.filter(
        (recipe) => !existingRecipeTitles.has(recipe.title.toLowerCase())
      );

      for (const recipe of recipesToAdd) {
        await addRecipe(recipe);
      }

      setAddedSauceRecipesCount(recipesToAdd.length);
      setShowPackAddedModal(true);
      return;
    }

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

          <View style={[styles.infoBox, styles.upcomingBox]}>
            <Text style={[styles.infoTitle, styles.upcomingTitle]}>Próximamente</Text>
            <Text style={[styles.infoText, styles.upcomingDescription]}>
              Packs temáticos para ampliar tu recetario.
            </Text>

            <View style={styles.upcomingPacksGrid}>
              {upcomingRecipePackRows.map((packRow, rowIndex) => (
                <View key={rowIndex} style={styles.upcomingPacksRow}>
                  {packRow.map((packName) => {
                    const isSaucesPack = packName === 'Salsas';

                    return (
                      <TouchableOpacity
                        key={packName}
                        style={[
                          styles.upcomingPackButton,
                          isSaucesPack && styles.featuredPackButton,
                        ]}
                        onPress={() => handleUpcomingPackPress(packName)}
                      >
                        <Text
                          style={[
                            styles.upcomingPackButtonText,
                            isSaucesPack && styles.featuredPackButtonText,
                          ]}
                        >
                          {packName}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
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

        <Modal
          visible={showPackAddedModal}
          transparent
          animationType="fade"
          onRequestClose={() => setShowPackAddedModal(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalCard}>
              <Text style={styles.modalTitle}>Pack agregado con éxito</Text>
              <Text style={styles.modalText}>
                {addedSauceRecipesCount > 0
                  ? `Sumamos ${addedSauceRecipesCount} receta${addedSauceRecipesCount === 1 ? '' : 's'} de salsas a tu recetario.`
                  : 'Ya tenías todas las recetas de este pack en tu recetario.'}
              </Text>

              <TouchableOpacity
                style={styles.packConfirmButton}
                onPress={() => setShowPackAddedModal(false)}
              >
                <Text style={styles.packConfirmButtonText}>Aceptar</Text>
              </TouchableOpacity>
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
  packConfirmButton: {
    width: '100%',
    backgroundColor: '#e76f51',
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  packConfirmButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '900',
    textAlign: 'center',
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
    gap: 14,
    marginTop: 18,
  },
  upcomingPacksRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
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
    width: '30%',
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
  featuredPackButton: {
    backgroundColor: '#e76f51',
    borderColor: '#c94f34',
    borderBottomColor: '#c94f34',
  },
  featuredPackButtonText: {
    color: '#ffffff',
  },
  titleLogo: {
    width: 54,
    height: 54,
    resizeMode: 'contain',
  },
});

export default SettingsScreen;
