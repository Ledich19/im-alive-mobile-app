import React from 'react';
import {
  StyleSheet,
  View,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Formik } from 'formik';

import AuthInput from '../../components/AuthInput';
import MainButton from '../../components/buttons/MainButton';
import SmallButton from '../../components/buttons/SmallButton';
import { Text, View as ThemeView } from '../../components/Themed';
import { RegisterSchema } from '../../yupSchema/authSchema';

const initialState = {
  email: '',
  password: '',
  confirmPassword: '',
};

interface IInitialState {
  email: string;
  password: string;
  confirmPassword: string;
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
});

interface IRegistrationScreen {
  navigation: StackNavigationProp<any>;
}

const RegistrationScreen: React.FC<IRegistrationScreen> = ({ navigation }) => {
  const handleSignUp = (values: IInitialState) => {
    console.log('object :>> ', values);
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
              <Text style={styles.title}>Registration</Text>
            </View>

            <Formik
              validationSchema={RegisterSchema}
              initialValues={initialState}
              onSubmit={(values) => handleSignUp(values)}
            >
              {({ handleChange, handleSubmit, values, errors }) => {
                return (
                  <>
                    <View style={styles.bottom}>
                      <AuthInput
                        placeholder="Email"
                        state={values.email}
                        onChangeText={handleChange('email')}
                      />
                      {errors.email && <Text>{errors.email}</Text>}
                    </View>
                    <View style={styles.bottom}>
                      <AuthInput
                        placeholder="Password"
                        state={values.password}
                        onChangeText={handleChange('password')}
                      />
                      {errors.password && <Text>{errors.password}</Text>}
                    </View>
                    <View style={styles.bottom}>
                      <AuthInput
                        placeholder="Confirm Password"
                        state={values.confirmPassword}
                        onChangeText={handleChange('confirmPassword')}
                      />
                      {errors.confirmPassword && <Text>{errors.confirmPassword}</Text>}
                    </View>
                    <View style={styles.bottom}>
                      <MainButton title="Registration" handlePress={handleSubmit} />
                    </View>
                  </>
                );
              }}
            </Formik>

            <SmallButton title="To login" handlePress={() => navigation.navigate('LoginScreen')} />
          </KeyboardAvoidingView>
        </View>
      </ThemeView>
    </TouchableWithoutFeedback>
  );
};

export default RegistrationScreen;
