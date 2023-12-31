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
import { doc, setDoc } from 'firebase/firestore';

import AuthInput from '../../components/AuthInput';
import MainButton from '../../components/buttons/MainButton';
import SmallButton from '../../components/buttons/SmallButton';
import { Text, View as ThemeView } from '../../components/Themed';
import { RegisterSchema } from '../../yupSchema/authSchema';
import { db, register, updateProfileDate } from '../../config/firebase';
import { flashMessage } from '../../helpers/flashMessage';

const initialState = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
};

interface IInitialState {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface IRegistrationScreen {
  navigation: StackNavigationProp<any>;
}

const RegistrationScreen: React.FC<IRegistrationScreen> = ({ navigation }) => {
  const handleSignUp = async (values: IInitialState) => {
    try {
      const res = await register(values.email, values.password);
      if (res) {
        updateProfileDate(res.user, { name: values.name });
        try {
          await setDoc(doc(db, 'users', res.user.uid), {
            email: values.email,
            name: values.name,
          });
        } catch (e) {
          console.error('Error adding document: ', e);
        }
      }
    } catch (error: any) {
      flashMessage({ isError: true, message: error.code });
      console.log('error :>> ', error);
    }
  };

  const hideKeyboardOnTouch = () => {
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={hideKeyboardOnTouch}>
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
              {({ handleChange, handleSubmit, values, errors, touched, handleBlur }) => {
                return (
                  <>
                    <View style={styles.bottom}>
                      <AuthInput
                        placeholder="Name"
                        state={values.name}
                        onChangeText={handleChange('name')}
                        handleBlur={handleBlur('name')}
                      />
                      {errors.email && touched.name && <Text>{errors.name}</Text>}
                    </View>

                    <View style={styles.bottom}>
                      <AuthInput
                        placeholder="Email"
                        state={values.email}
                        onChangeText={handleChange('email')}
                        handleBlur={handleBlur('email')}
                      />
                      {errors.email && touched.email && <Text>{errors.email}</Text>}
                    </View>
                    <View style={styles.bottom}>
                      <AuthInput
                        placeholder="Password"
                        state={values.password}
                        onChangeText={handleChange('password')}
                        handleBlur={handleBlur('password')}
                      />
                      {errors.password && touched.password && <Text>{errors.password}</Text>}
                    </View>
                    <View style={styles.bottom}>
                      <AuthInput
                        placeholder="Confirm Password"
                        state={values.confirmPassword}
                        onChangeText={handleChange('confirmPassword')}
                        handleBlur={handleBlur('confirmPassword')}
                      />
                      {errors.confirmPassword && touched.confirmPassword && (
                        <Text>{errors.confirmPassword}</Text>
                      )}
                    </View>
                    <View style={styles.bottom}>
                      <MainButton title="Registration" handlePress={handleSubmit} />
                    </View>
                  </>
                );
              }}
            </Formik>
            <View style={styles.bottomRedirectWrapper}>
              <Text>You have an account? </Text>
              <SmallButton title="Login" handlePress={() => navigation.navigate('LoginScreen')} />
            </View>
          </KeyboardAvoidingView>
        </View>
      </ThemeView>
    </TouchableWithoutFeedback>
  );
};

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

export default RegistrationScreen;
