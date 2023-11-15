import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import QRCode from 'react-native-qrcode-svg';

const QRCodeScreen = () => {
  const payload = { name: 'artem', id: '12312312312' };

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
