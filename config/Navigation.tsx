import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Entypo } from '@expo/vector-icons';
import { useColorScheme } from 'react-native';
import Home from '../screens/Home';
import Options from '../screens/Options';
import MessageOptions from '../screens/MessageOptions';
import { darkTheme, lightTheme } from '../constants/Colors';

// const MainStack = createStackNavigator();

const Tab = createBottomTabNavigator();

function MyTabs() {
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
}

export default () => {
  const colorScheme = useColorScheme();
  return (
    <NavigationContainer theme={colorScheme === 'dark' ? darkTheme : lightTheme} independent>
      {/* <MainStackScreen /> */}
      <MyTabs />
    </NavigationContainer>
  );
};
