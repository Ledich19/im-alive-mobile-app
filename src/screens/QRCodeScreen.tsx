import { User, onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { auth } from '../config/firebase';

const QRCodeScreen = () => {
  const [user, setUser] = useState<User>();

  const payload = { name: user?.displayName, id: user?.uid };

  useEffect(() => {
    onAuthStateChanged(auth, (userData) => {
      if (userData) setUser(userData);
    });
  }, []);

  return (
    <View style={styles.wraper}>
      <QRCode value={JSON.stringify(payload)} size={200} />
    </View>
  );
};

export default QRCodeScreen;

const styles = StyleSheet.create({
  wraper: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});
