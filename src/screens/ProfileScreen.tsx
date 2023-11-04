import { StyleSheet, SafeAreaView, TouchableOpacity, Text } from 'react-native';

import { DocumentData, doc, onSnapshot, setDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import colors from '../constants/Colors';
import SmallButton from '../components/buttons/SmallButton';
import { db, logOut } from '../config/firebase';

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

const ProfileScreen = () => {
  const handleSaveOptions = async () => {
    const collectionVal = doc(db, 'subscribtions', 'myID12', 'subscribeTo', 'uID');

    try {
      await setDoc(collectionVal, { time: new Date(), isOk: true });
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  };
  const [ok, setOk] = useState<DocumentData>();

  useEffect(() => {
    onSnapshot(doc(db, 'subscribtions', 'myID12', 'subscribeTo', 'uID'), (docs) => {
      console.log('doc :>> ', docs.data());
      setOk(docs.data());
    });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <SmallButton title="Logout" handlePress={logOut} />
      {ok?.isOk && <Text>ok</Text>}
      <TouchableOpacity style={styles.button} onPress={handleSaveOptions}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};
export default ProfileScreen;
