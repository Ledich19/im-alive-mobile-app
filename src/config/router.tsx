import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Entypo } from '@expo/vector-icons';

import LogInScreen from '../screens/auth/LogInScreen';
import ForgotPasswordScreen from '../screens/auth/ForgotPasswordScreen';
import RegistrationScreen from '../screens/auth/RegistrationScreen';
import NewPasswordScreen from '../screens/auth/NewPasswordScreen';
import Home from '../screens/Home';
import Options from '../screens/Options';
import MessageOptions from '../screens/MessageOptions';

const AuthStack = createStackNavigator();
const Tab = createBottomTabNavigator();

const authRoute = [
  { component: LogInScreen, name: 'LoginScreen' },
  { component: RegistrationScreen, name: 'RegistrationScreen' },
  { component: ForgotPasswordScreen, name: 'ForgotPassword' },
  { component: NewPasswordScreen, name: 'NewPasswordScreen' },
];

export const useRoute = (isAuth: boolean) => {
  if (!isAuth) {
    return (
      <AuthStack.Navigator>
        {authRoute.map(({ name, component }) => (
          <AuthStack.Screen
            key={name}
            options={{
              headerShown: false,
              cardOverlayEnabled: true,
            }}
            name={name}
            component={component}
          />
        ))}
      </AuthStack.Navigator>
    );
  }

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color, size }) => <Entypo name="home" size={size} color={color} />,
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Options"
        component={Options}
        options={{
          tabBarIcon: ({ color, size }) => <Entypo name="cog" size={size} color={color} />,
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="MessageOptions"
        component={MessageOptions}
        options={{
          tabBarButton: () => null,
        }}
      />
    </Tab.Navigator>
  );
};