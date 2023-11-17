import { StyleSheet, SafeAreaView, TouchableOpacity, Text } from 'react-native';

import colors from '../constants/Colors';
import { logOut } from '../config/firebase';
import { SetFolovers, Subscribe } from '../helpers/subscribe';

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
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default () => {
  const handleSaveOptions = async () => {
    Subscribe('oT1tlfT6CJND9U8Q6rAUYmCBALx1', 'TNid9J1384UPWjSkwxDONYHDlRc2');
    SetFolovers('TNid9J1384UPWjSkwxDONYHDlRc2', 'oT1tlfT6CJND9U8Q6rAUYmCBALx1');
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handleSaveOptions}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => logOut()}>
        <Text style={styles.buttonText}>logout</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleSaveOptions}>
        <Text style={styles.buttonText}>Sub</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};
