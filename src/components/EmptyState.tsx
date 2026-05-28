import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

type Props = {
  message: string;
};

const EmptyState: React.FC<Props> = ({ message }) => {
  return (
    <View style={styles.container}>
      <Ionicons name="file-tray-outline" size={42} color="#999" />
      <Text style={styles.text}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 48,
  },
  text: {
    marginTop: 8,
    fontSize: 15,
    color: '#777',
    textAlign: 'center',
  },
});

export default EmptyState;