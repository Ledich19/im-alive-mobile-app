import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  Text,
} from 'react-native';

import AuthInput from '../../components/AuthInput';

const initialState = {
  email: '',
  password: '',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 32,
    paddingBottom: 100,
  },
  text: {
    alignSelf: 'center',
    color: '#2A3547',
    fontSize: 20,
  },
});

export default function LoginScreen() {
  const [state, setState] = useState(initialState);

  const hideKeyboardOnTouch = () => {
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={hideKeyboardOnTouch} style={{ backgroundColor: 'green' }}>
      <View style={styles.container}>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <Text style={styles.text}>Login</Text>
          <View>
            <AuthInput
              placeholder="Email"
              state={state.email}
              onChangeText={(text) => {
                setState((prevState) => ({ ...prevState, email: text }));
              }}
            />
            <AuthInput
              placeholder="Password"
              state={state.password}
              onChangeText={(text) => {
                setState((prevState) => ({ ...prevState, password: text }));
              }}
            />
          </View>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
}
