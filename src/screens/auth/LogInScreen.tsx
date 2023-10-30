import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

import AuthInput from '../../components/AuthInput';
import MainButton from '../../components/buttons/MainButton';
import SmallButton from '../../components/buttons/SmallButton';
import { Text, View as ThemeView } from '../../components/Themed';
import { login } from '../../config/firebase';

const initialState = {
  email: '',
  password: '',
};

interface IState {
  email: string;
  password: string;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 32,
  },

  title: {
    alignSelf: 'center',
    color: '#2A3547',
    fontSize: 20,
    marginBottom: 24,
  },
  bottom: { marginBottom: 24 },
  bottomRedirectWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

interface ILoginScreen {
  navigation: StackNavigationProp<any>;
}

const LoginScreen: React.FC<ILoginScreen> = ({ navigation }) => {
  const [state, setState] = useState<IState>(initialState);

  const handleSignUp = async () => {
    try {
      await login(state.email, state.password);
    } catch (error) {
      console.log('error :>> ', error);
    }
  };

  const hideKeyboardOnTouch = () => {
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={hideKeyboardOnTouch} style={{ backgroundColor: 'green' }}>
      <ThemeView style={styles.container}>
        <View>
          <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <View>
              <Text style={styles.title}>Login</Text>
            </View>
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

              <View style={styles.bottomRedirectWrapper}>
                <Text>You don`t have an account? </Text>
                <SmallButton
                  title="Register"
                  handlePress={() => navigation.navigate('RegistrationScreen')}
                />
              </View>
              <View style={styles.bottomRedirectWrapper}>
                <SmallButton
                  title="Forgot password"
                  handlePress={() => navigation.navigate('ForgotPassword')}
                />
              </View>
            </View>
          </KeyboardAvoidingView>
        </View>
      </ThemeView>
    </TouchableWithoutFeedback>
  );
};

export default LoginScreen;
