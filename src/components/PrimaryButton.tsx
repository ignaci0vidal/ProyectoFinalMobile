import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

type Props = {
  label: string;
  onPress: () => void;
  danger?: boolean;
};

const PrimaryButton: React.FC<Props> = ({ label, onPress, danger = false }) => {
  return (
    <TouchableOpacity
      style={[styles.button, danger && styles.buttonDanger]}
      onPress={onPress}
    >
      <Text style={styles.text}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#e76f51',
    paddingVertical: 15,
    paddingHorizontal: 18,
    borderRadius: 16,
    alignItems: 'center',
    marginTop: 4,
  },
  buttonDanger: {
    backgroundColor: '#e63946',
  },
  text: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '800',
  },
});

export default PrimaryButton;