import { useContext, useEffect, useState } from 'react';
import { StyleSheet, SafeAreaView, TouchableOpacity, Text, View } from 'react-native';
import { useRoute, useTheme } from '@react-navigation/native';
import NumberInput from '../components/NumberInput';
import { MessegeInput } from '../components/MessegeInput';
import { IOption } from '../app/types';
import { deleteFromAsyncStore, updateToAsyncStore } from '../config/asynkStore';
import { SettingsContext } from '../app/context';

type RouteParams = {
  data: IOption;
};

export default () => {
  const [setting, setSetting] = useState<IOption | null>(null);
  const route = useRoute();
  const { setSettings } = useContext(SettingsContext);
  const receivedData = route.params as RouteParams;
  const colors = useTheme().colors;
  
  const styles = StyleSheet.create({
    container: {
      paddingHorizontal: 16,
      backgroundColor: colors.background,
      flex: 1,
    },
    row: {
      paddingHorizontal: 20,
      paddingVertical: 16,
      justifyContent: 'space-between',
      alignItems: 'center',
      flexDirection: 'row',
      backgroundColor: colors.background,
    },
    button: {
      paddingHorizontal: 15,
      paddingTop: 7,
      height: 40,
      borderRightColor: colors.border,
      backgroundColor: 'white',
      borderRadius: 13,
      marginTop: 20,
      // position: 'absolute',
      // right: 0,
      // bottom: 0,
    },
    buttonText: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    text: {
      fontSize: 16,
      color: colors.text,
    },
    separator: {
      backgroundColor: colors.border,
      height: 1,
    },
  });

  useEffect(() => {
    if (receivedData) {
      setSetting(receivedData.data);
    }
  }, [receivedData]);

  const handleSaveOptions = async () => {
    const data = await updateToAsyncStore(setting);
    setSettings(data);
  };
  const handleDeleteOptions = async () => {
    const data = await deleteFromAsyncStore(setting);
    setSettings(data);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <NumberInput
          value={setting?.number || ''}
          placeholder="Number"
          onChangeText={(text) =>
            setSetting((item) => ({
              id: item?.id || '',
              message: setting?.message || '',
              number: text,
            }))
          }
        />
        <MessegeInput
          value={setting?.message || ''}
          placeholder="Message"
          onChangeText={(text) =>
            setSetting((item) => ({
              id: item?.id || '',
              message: text,
              number: item?.number || '',
            }))
          }
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleDeleteOptions}>
        <Text style={styles.buttonText}>Delete</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleSaveOptions}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};
