import AsyncStorage from '@react-native-async-storage/async-storage';
import { IOption } from '../../app/types';

export const getFromAsyncStore = async (storageName: string) => {
  try {
    const settingsString = await AsyncStorage.getItem(storageName);
    const data = settingsString ? JSON.parse(settingsString) : null;
    if (data) {
      return data;
    }
    return null;
  } catch (error) {
    console.error('Ошибка при получении настроек:', error);
    return null;
  }
};
// 'settings'
export const setToAsyncStore = async (data: any, storageName: string) => {
  try {
    const settingsString = await AsyncStorage.getItem(storageName);
    const settings = settingsString ? JSON.parse(settingsString) : [];
    await AsyncStorage.setItem(
      storageName,
      JSON.stringify(settings.concat(data))
      // JSON.stringify(settings.concat({ id: `${Math.random()}`, number, message }))
    );
    return data;
  } catch (error) {
    console.error('Ошибка при сохранении настроек:', error);
    return null;
  }
};
export const updateToAsyncStore = async (data: any, storageName: string) => {
  try {
    const settingsString = await AsyncStorage.getItem(storageName);
    const settings = settingsString ? JSON.parse(settingsString) : [];
    const newSettings = settings.map((el: IOption) => {
      if (el.id === data.id) {
        return data;
      }
      return el;
    });
    await AsyncStorage.setItem(storageName, JSON.stringify(newSettings));
    return newSettings;
  } catch (error) {
    console.error('Ошибка при сохранении настроек:', error);
    return null;
  }
};

export const deleteFromAsyncStore = async (data: any, storageName: string) => {
  try {
    const settingsString = await AsyncStorage.getItem(storageName);
    const settings = settingsString ? JSON.parse(settingsString) : [];

    const newSettings = settings.filter((el: IOption) => el.id !== data.id);
    await AsyncStorage.setItem(storageName, JSON.stringify(newSettings));
    return newSettings;
  } catch (error) {
    console.error('Error when deleting settings:', error);
    return null;
  }
};
