import { StyleSheet, View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SMS from 'expo-sms';
import colors from '../constants/Colors';
import RowItem from '../components/RowItem';

export default () => {
  const colorsa = useTheme().colors;
  const styles = StyleSheet.create({
    container: {
      paddingHorizontal: 16,
      justifyContent: 'center',
      backgroundColor: colors.light.background,
      flex: 1,
    },
    text: {
      fontSize: 16,
      color: colors.light.text,
    },
    separator: {
      backgroundColor: colors.light.borderColor,
      height: 1,
    },
    header: {
      alignItems: 'flex-end',
      marginHorizontal: 20,
    },
  });
  console.log(colorsa);

  const getSettings = async () => {
    try {
      const settingsString = await AsyncStorage.getItem('settings');
      const settings = settingsString ? JSON.parse(settingsString) : null;
      return settings;
    } catch (error) {
      console.error('Ошибка при получении настроек:', error);
      return null;
    }
  };

  const handleSendSMS = async () => {
    const settings = await getSettings();
    const isAvailable = await SMS.isAvailableAsync();
    if (isAvailable) {
      await SMS.sendSMSAsync([settings.number], settings.message);
    } else {
      console.error('Отправка SMS недоступна на данном устройстве');
    }
  };

  return (
    <View style={styles.container}>
      <RowItem onPress={handleSendSMS} />
    </View>
  );
};
