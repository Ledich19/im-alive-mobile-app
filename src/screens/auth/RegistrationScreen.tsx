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
import { addDoc, collection } from 'firebase/firestore';

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
          const docRef = await addDoc(collection(db, 'users'), {
            email: values.email,
            name: values.name,
          });
          console.log('Document written with ID: ', docRef.id);
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
                        placeholder="Name"
                        state={values.name}
                        onChangeText={handleChange('name')}
                      />
                      {errors.email && <Text>{errors.name}</Text>}
                    </View>

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

export default RegistrationScreen;
