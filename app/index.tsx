// import { ThemeProvider } from '@react-navigation/native';
// import { useColorScheme } from 'react-native';
import Navigation from '../src/config/Navigation';
import { SettingsProvider } from './context';
// import { darkTheme, lightTheme } from '../constants/Colors';

export default function App() {
  return (
    <SettingsProvider>
      <Navigation />
    </SettingsProvider>
  );
}
