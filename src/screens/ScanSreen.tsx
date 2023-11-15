import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

type IScanData = {
  name: string;
  id: string;
};

export default function ScanSreen() {
  const [loading, setLoading] = useState(true);
  const [scanData, setScanData] = useState<IScanData>();
  const [permission, setPermission] = useState(true);
  const requestCameraPermission = async () => {
    try {
      const { status, granted } = await BarCodeScanner.requestPermissionsAsync();
      console.log(status, granted);
      if (status === 'granted') {
        setPermission(true);
      } else {
        setPermission(false);
      }
    } catch (error) {
      setPermission(false);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    requestCameraPermission();
  }, []);

  if (loading)
    return (
      <View style={styles.container}>
        <Text>Requesting permision...</Text>
      </View>
    );
  if (scanData)
    return (
      <View style={styles.container}>
        <Text>Name: {scanData.name}</Text>
        <Text>Id: {scanData.id}</Text>
        <Button title="Scan again" onPress={() => setScanData(undefined)} />
      </View>
    );

  if (permission)
    return (
      <BarCodeScanner
        style={styles.container}
        onBarCodeScanned={({ type, data }) => {
          try {
            console.log('type :>> ', type);
            console.log('data :>> ', data);

            let res = JSON.parse(data);
            setScanData(res);
          } catch (error) {
            console.log('error :>> ', error);
          }
        }}
      >
        <Text style={styles.text}>Scan QR code</Text>
      </BarCodeScanner>
    );

  return <View style={styles.container}></View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  text: { backgroundColor: 'black', color: 'white', alignSelf: 'center' },
});
