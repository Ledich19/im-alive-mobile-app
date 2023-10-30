import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const styles = StyleSheet.create({
  text: {
    color: 'green',
  },
});

const ForgotPasswordScreen = () => {
  return (
    <View>
      <Text style={styles.text}>ForgotPasswordScreen</Text>
    </View>
  );
};

export default ForgotPasswordScreen;
