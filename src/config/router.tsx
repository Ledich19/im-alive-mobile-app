import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Entypo, MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';

import LogInScreen from '../screens/auth/LogInScreen';
import ForgotPasswordScreen from '../screens/auth/ForgotPasswordScreen';
import RegistrationScreen from '../screens/auth/RegistrationScreen';

import Home from '../screens/Home';
import Options from '../screens/Options';
import MessageOptions from '../screens/MessageOptions';

const AuthStack = createStackNavigator();
const Tab = createBottomTabNavigator();

const authRoute = [
  { component: LogInScreen, name: 'LoginScreen' },
  { component: RegistrationScreen, name: 'RegistrationScreen' },
  { component: ForgotPasswordScreen, name: 'ForgotPassword' },
];

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import MySabs from '../screens/tabTopSubs/MySubs';
import InformTab from '../screens/tabTopSubs/InformTab';
import QRCodeScreen from '../screens/QRCodeScreen';
import ScanSreen from '../screens/ScanSreen';

const TopTabNavigation = createMaterialTopTabNavigator();

const SubsTopTab = () => {
  return (
    <TopTabNavigation.Navigator>
      <TopTabNavigation.Screen name="My subscription" component={MySabs} />
      <TopTabNavigation.Screen name="Inform" component={InformTab} />
    </TopTabNavigation.Navigator>
  );
};

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
        name="Message"
        component={SubsTopTab}
        options={{
          tabBarIcon: ({ color, size }) => <AntDesign name="wifi" size={size} color={color} />,

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

      <Tab.Screen
        name="qrcode"
        component={QRCodeScreen}
        options={{
          tabBarButton: () => null,
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="scanscreen"
        component={ScanSreen}
        options={{
          tabBarButton: () => null,
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};
