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
import { StackNavigationProp } from '@react-navigation/stack';

import AuthInput from '../../components/AuthInput';
import MainButton from '../../components/buttons/MainButton';
import SmallButton from '../../components/buttons/SmallButton';

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
    marginBottom: 24,
  },
  bottom: { marginBottom: 24 },
});

interface ILoginScreen {
  navigation: StackNavigationProp<any>;
}

const LoginScreen: React.FC<ILoginScreen> = ({ navigation }) => {
  const [state, setState] = useState(initialState);

  const handleSignUp = () => {};

  const hideKeyboardOnTouch = () => {
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={hideKeyboardOnTouch} style={{ backgroundColor: 'green' }}>
      <View style={styles.container}>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <Text style={styles.text}>Login</Text>
          <View>
            <View style={styles.bottom}>
              <AuthInput
                placeholder="Email"
                state={state.email}
                onChangeText={(text) => {
                  setState((prevState) => ({ ...prevState, email: text }));
                }}
              />
            </View>
            <View style={styles.bottom}>
              <AuthInput
                placeholder="Password"
                state={state.password}
                onChangeText={(text) => {
                  setState((prevState) => ({ ...prevState, password: text }));
                }}
              />
            </View>
            <View style={styles.bottom}>
              <MainButton title="Login" handlePress={handleSignUp} />
            </View>
            <SmallButton
              title="To register"
              handlePress={() => navigation.navigate('RegistrationScreen')}
            />
            <SmallButton
              title="Forgot password"
              handlePress={() => navigation.navigate('ForgotPassword')}
            />
          </View>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default LoginScreen;
