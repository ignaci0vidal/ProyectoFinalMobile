import React from 'react';
import {
  KeyboardTypeOptions,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from 'react-native';

type Props = {
  label: string;
  value: string;
  onChangeText: (value: string) => void;
  placeholder: string;
  multiline?: boolean;
  keyboardType?: KeyboardTypeOptions;
  onFocus?: TextInputProps['onFocus'];
};

const FormInput: React.FC<Props> = ({
  label,
  value,
  onChangeText,
  placeholder,
  multiline = false,
  keyboardType = 'default',
  onFocus,
}) => {
  return (
    <View style={styles.inputGroup}>
      <Text style={styles.inputLabel}>{label}</Text>

      <TextInput
        style={[styles.input, multiline && styles.inputMultiline]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        multiline={multiline}
        keyboardType={keyboardType}
        onFocus={onFocus}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputGroup: {
    marginBottom: 14,
  },
  inputLabel: {
    fontSize: 15,
    fontWeight: '700',
    color: '#2b2d42',
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#f0dfd2',
    borderRadius: 14,
    padding: 12,
    fontSize: 15,
  },
  inputMultiline: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
});

export default FormInput;
