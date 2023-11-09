import * as SMS from 'expo-sms';
import { useContext, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, Text, ScrollView, SafeAreaView } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useTheme, useNavigation } from '@react-navigation/native';
import RowItem from '../components/RowItem';
import { getFromAsyncStore, setToAsyncStore } from '../config/asynkStore';
import { IOption } from '../../app/types';
import { SettingsContext } from '../../app/context';
import { BaseTheme } from '../constants/Colors';

type RootStackParamList = {
  MessageOptions: { data: IOption | undefined };
};

export default () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const { settings, setSettings } = useContext(SettingsContext);
  const colors = useTheme().colors as BaseTheme;

  const styles = StyleSheet.create({
    container: {
      paddingHorizontal: 16,
      backgroundColor: colors.background,
      flex: 1,
    },
    text: {
      fontSize: 16,
      color: colors.text,
    },
    separator: {
      backgroundColor: colors.border,
      height: 1,
    },
    header: {
      alignItems: 'flex-end',
      marginHorizontal: 20,
    },
    button: {
      paddingHorizontal: 15,
      paddingTop: 7,
      height: 40,
      borderRightColor: colors.border,
      backgroundColor: colors.button,
      borderRadius: 13,
      marginTop: 20,
      marginBottom: 20,
    },
    buttonText: {
      fontSize: 18,
      color: colors.buttonText,
    },
  });

  const handleSendSMS = async (item: IOption) => {
    const isAvailable = await SMS.isAvailableAsync();
    if (isAvailable) {
      await SMS.sendSMSAsync([item.number], item.message);
    } else {
      console.error('Отправка SMS недоступна на данном устройстве');
    }
  };

  const handleAddNew = async () => {
    await setToAsyncStore({ id: `${Math.random()}`, number: '', message: '' });
    const newSettings = await getFromAsyncStore();
    if (!settings) return;
    setSettings(newSettings);
  };

  useEffect(() => {
    getFromAsyncStore().then((data) => setSettings(data || []));
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={styles.container}>
        {/* <RowItem onPress={handleSendSMS} /> */}
        {/* eslint-disable-next-line no-bitwise */}
        {settings.map((item, i) => (
          <RowItem
            index={i}
            key={item.id}
            onPress={() => handleSendSMS(item)}
            text={item.message || '...'}
            onPressOption={() =>
              navigation.navigate('MessageOptions', {
                data: item,
              })
            }
          />
        ))}

        <TouchableOpacity style={styles.button} onPress={handleAddNew}>
          <Text style={styles.buttonText}>Add new</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};
