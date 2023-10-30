import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const styles = StyleSheet.create({
  text: {
    color: 'green',
  },
});

const NewPasswordScreen = () => {
  return (
    <View>
      <Text style={styles.text}>NewPasswordScreen</Text>
    </View>
  );
};

export default NewPasswordScreen;
