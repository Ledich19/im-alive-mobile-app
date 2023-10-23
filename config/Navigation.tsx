import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { ImageBackground, StyleSheet } from 'react-native';
// import { createStackNavigator } from '@react-navigation/stack';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { Entypo } from '@expo/vector-icons';
// import Home from '../screens/Home';
// import Options from '../screens/Options';
// import MessageOptions from '../screens/MessageOptions';
import { useRoute } from './router';

// const MainStack = createStackNavigator();

// const Tab = createBottomTabNavigator();

// function MyTabs() {
//   return (
//     <Tab.Navigator>
//       <Tab.Screen
//         name="Home"
//         component={Home}
//         options={{
//           tabBarIcon: ({ color, size }) => <Entypo name="home" size={size} color={color} />,
//           headerShown: false,
//         }}
//       />
//       <Tab.Screen
//         name="Options"
//         component={Options}
//         options={{
//           tabBarIcon: ({ color, size }) => <Entypo name="cog" size={size} color={color} />,
//           headerShown: false,
//         }}
//       />
//       <Tab.Screen
//         name="MessageOptions"
//         component={MessageOptions}
//         options={{
//           tabBarButton: () => null,
//         }}
//       />
//     </Tab.Navigator>
//   );
// }

const styles = StyleSheet.create({
  bgImg: {
    flex: 1,
  },
});

const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'transparent',
  },
};

export default () => {
  const isAutorised = true;
  const routing = useRoute(isAutorised);

  return (
    <ImageBackground source={require('../assets/images/lite-bg-app.jpg')} style={styles.bgImg}>
      <NavigationContainer theme={navTheme} independent>
        {routing}
      </NavigationContainer>
    </ImageBackground>
  );
};
