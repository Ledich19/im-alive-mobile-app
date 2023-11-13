import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { User, onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';

import { useRoute } from './router';
import { auth } from './firebase';

const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'transparent',
  },
};

export default () => {
  const [user, setuser] = useState<User | null>(null);

  useEffect(() => {
    onAuthStateChanged(auth, (userData) => {
      setuser(userData);
    });
  }, []);
  if (!user) return;
  const routing = useRoute(user?.emailVerified);

  return (
    <NavigationContainer theme={navTheme} independent>
      {routing}
    </NavigationContainer>
  );
};
