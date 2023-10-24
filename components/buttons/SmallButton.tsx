import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';

const styles = StyleSheet.create({
  btn: {
    borderRadius: 20,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnTitle: {
    color: 'black',
    fontSize: 16,
    fontWeight: '600',
  },
});

type TMainButton = {
  title: string;
  handlePress: () => void;
};
const SmallButton: React.FC<TMainButton> = ({ title, handlePress }) => {
  return (
    <View>
      <TouchableOpacity style={styles.btn} onPress={handlePress}>
        <Text style={styles.btnTitle}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SmallButton;
