import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const styles = StyleSheet.create({
  text: {
    color: 'green',
  },
});

const RegistrationScreen = () => {
  return (
    <View>
      <Text style={styles.text}>RegistrationScreen</Text>
    </View>
  );
};

export default RegistrationScreen;
