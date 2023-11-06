import { useTheme } from '@react-navigation/native';
import { StyleSheet, SafeAreaView, TouchableOpacity, Text } from 'react-native';
import { BaseTheme } from '../constants/Colors';


export default () => {
  const colors = useTheme().colors as BaseTheme;
  const styles = StyleSheet.create({
    container: {
      paddingHorizontal: 16,
      backgroundColor: colors.background,
      flex: 1,
    },
    button: {
      paddingHorizontal: 15,
      paddingTop: 7,
      height: 40,
      borderRightColor: colors.border,
      backgroundColor: colors.button,
      borderRadius: 13,
      position: 'absolute',
      right: 0,
      bottom: 0,
    },
    buttonText: {
      fontSize: 18,
      color: colors.buttonText,
      fontWeight: 'bold',
    },
  });
  const handleSaveOptions = async () => {};

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handleSaveOptions}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};
