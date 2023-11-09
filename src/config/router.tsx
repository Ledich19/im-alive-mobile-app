import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Entypo, MaterialCommunityIcons } from '@expo/vector-icons';

import LogInScreen from '../screens/auth/LogInScreen';
import ForgotPasswordScreen from '../screens/auth/ForgotPasswordScreen';
import RegistrationScreen from '../screens/auth/RegistrationScreen';

import Home from '../screens/Home';
import Options from '../screens/Options';
import MessageOptions from '../screens/MessageOptions';
import ProfileScreen from '../screens/ProfileScreen';

const AuthStack = createStackNavigator();
const Tab = createBottomTabNavigator();

const authRoute = [
  { component: LogInScreen, name: 'LoginScreen' },
  { component: RegistrationScreen, name: 'RegistrationScreen' },
  { component: ForgotPasswordScreen, name: 'ForgotPassword' },
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
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="face-man-profile" size={size} color={color} />
          ),

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
