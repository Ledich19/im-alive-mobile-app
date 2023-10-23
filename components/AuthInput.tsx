import { StyleSheet, TextInput, View } from 'react-native';
import React from 'react';

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: '#fff',
    height: 44,
    marginTop: 24,
  },
  input: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
    fontSize: 16,
  },
});

type TAuthInput = {
  placeholder: string;
  state: string;
  // eslint-disable-next-line no-unused-vars
  onChangeText: (text: string) => void;
};

const AuthInput: React.FC<TAuthInput> = ({ placeholder, state, onChangeText }) => {
  return (
    <View style={styles.wrap}>
      <TextInput
        style={{ ...styles.input }}
        placeholder={placeholder ?? ''}
        value={state}
        onChangeText={onChangeText}
        placeholderTextColor="#3C3C4399"
      />
    </View>
  );
};

export default AuthInput;
