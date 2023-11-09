import FlashMessage from 'react-native-flash-message';
import { SettingsProvider } from './context';
import Navigation from '../src/config/Navigation';

// if (__DEV__) {
//   import('../ReactotronConfig.js').then(() => console.log('Reactotron Configured'));
// }

export default function App() {
  return (
    <SettingsProvider>
      <FlashMessage position="top" />
      <Navigation />
    </SettingsProvider>
  );
}
