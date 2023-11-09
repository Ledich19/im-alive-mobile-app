import { NavigationContainer, useTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Entypo } from '@expo/vector-icons';
import { useColorScheme } from 'react-native';
import Home from '../screens/Home';
import Options from '../screens/Options';
import MessageOptions from '../screens/MessageOptions';
import { BaseTheme, darkTheme, lightTheme } from '../constants/Colors';

const Tab = createBottomTabNavigator();

function MyTabs() {
  const colors = useTheme().colors as BaseTheme;
  return (
    <Tab.Navigator
      screenOptions={() => ({
        tabBarStyle: { backgroundColor: colors.menu },
        tabBarActiveTintColor: colors.menuItem,
        tabBarInactiveTintColor: colors.active,
      })}
    >
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
}

export default () => {
  const colorScheme = useColorScheme();
  return (
    <NavigationContainer theme={colorScheme === 'dark' ? darkTheme : lightTheme} independent>
      <MyTabs />
    </NavigationContainer>
  );
};
