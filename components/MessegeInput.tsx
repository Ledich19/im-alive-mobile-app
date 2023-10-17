import React from 'react';
import { View, TouchableOpacity, Text, TextInput, StyleSheet } from 'react-native';
import colors from '../constants/Colors';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    borderRadius: 5,
    marginTop: 16,
  },
  button: {
    paddingHorizontal: 15,
    paddingTop: 7,
    height: 40,
    borderRightColor: colors.light.borderColor,
    backgroundColor: 'white',
    borderRadius: 13,
    position: 'absolute',
    right: 0,
    bottom: 0,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  input: {
    flex: 1,
    backgroundColor: '#EBEBF599',
    borderRadius: 13,
    height: 40,
    paddingLeft: 10,
    fontSize: 18,
    textAlignVertical: 'top', // Align content at the top
    minHeight: 100, // Minimum height
  },
});

interface IProps {
  text: string;
  value: string;
  onButtonPress: () => void;
  placeholder: string;
  // eslint-disable-next-line no-unused-vars
  onChangeText: (text: string) => void;
}

export const MessegeInput = ({ text, value, onButtonPress, onChangeText, placeholder }: IProps) => {
  return (
    <View style={styles.container}>
      <TextInput
        multiline
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        style={styles.input}
      />
      <TouchableOpacity style={styles.button} onPress={onButtonPress}>
        <Text style={styles.buttonText}>{text}</Text>
      </TouchableOpacity>
    </View>
  );
};
