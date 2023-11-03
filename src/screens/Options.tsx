import { StyleSheet, SafeAreaView, TouchableOpacity, Text } from 'react-native';

import colors from '../constants/Colors';
import SmallButton from '../components/buttons/SmallButton';
import { db, logOut } from '../config/firebase';
import { addDoc, collection } from 'firebase/firestore';

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
  const handleSaveOptions = async () => {
    try {
      const docRef = await addDoc(collection(db, 'users'), {
        email: 'aw@sd',
        name: 'ddfa',
        date: new Date(),
        isOk: true,
      });
      console.log('Document written with ID: ', docRef.id);
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <SmallButton title="Logout" handlePress={logOut} />

      <TouchableOpacity style={styles.button} onPress={handleSaveOptions}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};
