import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import ItalianTableclothBackground from '../components/ItalianTableclothBackground';

const SettingsScreen: React.FC = () => {
  return (
    <ItalianTableclothBackground>
      <SafeAreaView style={styles.screen}>
        <Text style={styles.title}>Ajustes</Text>

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
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#f0dfd2',
  },
  infoTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#2b2d42',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 15,
    color: '#555',
    lineHeight: 21,
  },
});

export default SettingsScreen;