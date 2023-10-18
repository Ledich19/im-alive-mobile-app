import { useEffect, useState } from 'react';
import { StyleSheet, SafeAreaView, TouchableOpacity, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import colors from '../constants/Colors';
import NumberInput from '../components/NumberInput';
import { MessegeInput } from '../components/MessegeInput';

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    backgroundColor: colors.light.background,
    flex: 1,
  },
  row: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: colors.light.background,
  },
  button: {
    paddingHorizontal: 15,
    paddingTop: 7,
    height: 40,
    borderRightColor: colors.light.borderColor,
    backgroundColor: 'white',
    borderRadius: 13,
    position: 'absolute',
    right: 0,
    bottom: 0,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 16,
    color: colors.light.text,
  },
  separator: {
    backgroundColor: colors.light.borderColor,
    height: 1,
  },
});

export default () => {
  const [number, setNumber] = useState('');
  const [message, setMessage] = useState(`Everything is OK`);

  useEffect(() => {
    const getSettings = async () => {
      try {
        const settingsString = await AsyncStorage.getItem('settings');
        const settings = settingsString ? JSON.parse(settingsString) : null;
        setNumber(settings.number || '');
        setMessage(settings.message || '');
      } catch (error) {
        console.error('Ошибка при получении настроек:', error);
      }
    };
    getSettings();
  }, []);

  const handleSaveOptions = async () => {
    try {
      await AsyncStorage.setItem('settings', JSON.stringify({ number, message }));
    } catch (error) {
      console.error('Ошибка при сохранении настроек:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <NumberInput value={number} placeholder="Number" onChangeText={(text) => setNumber(text)} />
      <MessegeInput
        value={message}
        placeholder="Message"
        onChangeText={(text) => setMessage(text)}
      />
      <TouchableOpacity style={styles.button} onPress={handleSaveOptions}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};
