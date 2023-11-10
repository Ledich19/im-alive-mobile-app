import { NavigationContainer } from '@react-navigation/native';
import { User, onAuthStateChanged } from 'firebase/auth';
import { useColorScheme } from 'react-native';
import { useEffect, useState } from 'react';
import { useRoute } from './router';
import { auth } from './firebase';
import { darkTheme, lightTheme } from '../constants/Colors';

export default () => {
  const [user, setuser] = useState<User | null>(null);
  const colorScheme = useColorScheme();
  useEffect(() => {
    onAuthStateChanged(auth, (userData) => {
      setuser(userData);
    });
  }, []);

  const colors = colorScheme === 'dark' ? darkTheme : lightTheme;
  const routing = useRoute(!!user, colors.colors);

  return (
    <NavigationContainer theme={colorScheme === 'dark' ? darkTheme : lightTheme} independent>
      {routing}
    </NavigationContainer>
  );
};
