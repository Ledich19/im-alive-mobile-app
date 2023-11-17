import { BarCodeScanner } from 'expo-barcode-scanner';
import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import MainButton from '../components/buttons/MainButton';

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
        <Text>Do you want to subscribe to </Text>
        <Text>{scanData.name}</Text>
        <MainButton title="Press subscribe" handlePress={() => {}} />
        <Button title="Scan again" onPress={() => setScanData(undefined)} />
      </View>
    );

  if (permission)
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Scan QR code</Text>
        <View style={styles.cameraContainer}>
          <BarCodeScanner
            style={styles.cameraView}
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
          ></BarCodeScanner>
        </View>
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cameraContainer: {
    width: 220,
    height: 220,
    borderRadius: 13,
    padding: 5,
    borderColor: 'gray',
    borderWidth: 4,
  },
  cameraView: { height: '100%', width: '100%', borderRadius: 13 },
  text: {},
});
