import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

type Props = {
  title: string;
  content: string;
};

const Section: React.FC<Props> = ({ title, content }) => {
  return (
    <View style={styles.section}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.content}>{content}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#f0dfd2',
  },
  title: {
    fontSize: 18,
    fontWeight: '800',
    color: '#2b2d42',
    marginBottom: 8,
  },
  content: {
    fontSize: 15,
    color: '#555',
    lineHeight: 22,
  },
});

export default Section;