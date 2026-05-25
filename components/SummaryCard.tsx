import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

type Props = {
  label: string;
  value: string;
};

const SummaryCard: React.FC<Props> = ({ label, value }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 18,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#f0dfd2',
  },
  value: {
    fontSize: 24,
    fontWeight: '800',
    color: '#e76f51',
  },
  label: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
});

export default SummaryCard;