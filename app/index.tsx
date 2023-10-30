import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useColorScheme } from 'react-native';
import FlashMessage from 'react-native-flash-message';
import { SettingsProvider } from './context';
import Navigation from '../src/config/Navigation';

if (__DEV__) {
  import('../ReactotronConfig.js').then(() => console.log('Reactotron Configured'));
}

export default function App() {
  const colorScheme = useColorScheme();

  return (
    <SettingsProvider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Navigation />
        <FlashMessage position="top" />
      </ThemeProvider>
    </SettingsProvider>
  );
}
