import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';

const styles = StyleSheet.create({
  btnTitle: {
    color: '#2A3547',
    fontSize: 16,
    fontWeight: '600',
  },
});

type TSmallButton = {
  title: string;
  handlePress: () => void;
};
const SmallButton: React.FC<TSmallButton> = ({ title, handlePress }) => {
  return (
    <View>
      <TouchableOpacity onPress={handlePress}>
        <Text style={styles.btnTitle}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SmallButton;
