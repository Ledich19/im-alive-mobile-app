import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useColorScheme } from 'react-native';
import Navigation from '../config/Navigation';
import { SettingsProvider } from './context';

export default function App() {
  const colorScheme = useColorScheme();

  return (
    <SettingsProvider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Navigation />
      </ThemeProvider>
    </SettingsProvider>
  );
}
