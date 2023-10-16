import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { StyleSheet, View, useColorScheme } from 'react-native';
import Options from '../screens/Options';
import colors from '../constants/Colors';
import Home from '../screens/Home';

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: colors.light.background,
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});

export default function App() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <View style={styles.container}>
        {/* <Options /> */}
        <Home />
      </View>
    </ThemeProvider>
  );
}
