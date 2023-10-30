import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    borderRadius: 5,
    marginTop: 16,
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
  value: string;
  placeholder: string;
  // eslint-disable-next-line no-unused-vars
  onChangeText: (text: string) => void;
}

export const MessegeInput = ({ value, onChangeText, placeholder }: IProps) => {
  return (
    <View style={styles.container}>
      <TextInput
        multiline
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        style={styles.input}
      />
      {/* <TouchableOpacity style={styles.button} onPress={onButtonPress}>
        <Text style={styles.buttonText}>{text}</Text>
      </TouchableOpacity> */}
    </View>
  );
};
