import { StyleSheet, SafeAreaView, TouchableOpacity, Text } from 'react-native';

import colors from '../constants/Colors';
import { logOut } from '../config/firebase';

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    backgroundColor: colors.light.background,
    flex: 1,
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
});

export default () => {
  const handleSaveOptions = async () => {};

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handleSaveOptions}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => logOut()}>
        <Text style={styles.buttonText}>logout</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};
