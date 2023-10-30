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
import { sendPasswordResetEmail } from 'firebase/auth';

import AuthInput from '../../components/AuthInput';
import MainButton from '../../components/buttons/MainButton';
import SmallButton from '../../components/buttons/SmallButton';
import { Text, View as ThemeView } from '../../components/Themed';
import { auth } from '../../config/firebase';

const initialState = {
  email: '',
};

interface IState {
  email: string;
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

const ForgotPasswordScreen: React.FC<ILoginScreen> = ({ navigation }) => {
  const [state, setState] = useState<IState>(initialState);

  const handleReset = async () => {
    try {
      await sendPasswordResetEmail(auth, state.email);
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
              <Text style={styles.title}>Reset pasword</Text>
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
                <MainButton title="Change password" handlePress={handleReset} />
              </View>

              <View style={styles.bottomRedirectWrapper}>
                <Text>You don`t have an account? </Text>
                <SmallButton
                  title="To register"
                  handlePress={() => navigation.navigate('RegistrationScreen')}
                />
              </View>
            </View>
          </KeyboardAvoidingView>
        </View>
      </ThemeView>
    </TouchableWithoutFeedback>
  );
};

export default ForgotPasswordScreen;
