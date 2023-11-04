import { NativeSyntheticEvent, StyleSheet, TextInput, TextInputFocusEventData } from 'react-native';
import React from 'react';

const styles = StyleSheet.create({
  input: {
    width: '100%',
    paddingLeft: 16,
    paddingRight: 16,
    fontSize: 16,
    backgroundColor: '#fff',
    height: 44,
    borderRadius: 20,
  },
});

type TAuthInput = {
  placeholder: string;
  state: string;
  // eslint-disable-next-line no-unused-vars, react/require-default-props
  handleBlur?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  // eslint-disable-next-line no-unused-vars
  onChangeText: (text: string) => void;
};

const AuthInput: React.FC<TAuthInput> = ({ placeholder, state, onChangeText, handleBlur }) => {
  return (
    <TextInput
      style={{ ...styles.input }}
      placeholder={placeholder ?? ''}
      value={state}
      onBlur={handleBlur}
      onChangeText={onChangeText}
      placeholderTextColor="#3C3C4399"
    />
  );
};

export default AuthInput;
