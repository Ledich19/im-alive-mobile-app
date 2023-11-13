import { StyleSheet, SafeAreaView, TouchableOpacity, Text, View } from 'react-native';

import { DocumentData, collection, doc, getDocs, setDoc } from 'firebase/firestore';

import { User, onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { TextInput } from 'react-native-gesture-handler';
import colors from '../../constants/Colors';

import { auth, db } from '../../config/firebase';
import { getSubscriptions, mySubscribers } from '../../helpers/subscribe';

const InformTab = () => {
  const [userMessage, setUserMessages] = useState<string>('');
  const [user, setUser] = useState<User>();

  const handleSendMessag = async () => {
    if (!user?.uid) return;
    const dataRef = doc(db, 'messages', user?.uid);
    try {
      await setDoc(dataRef, {
        message: userMessage,
        time: new Date(),
        id: user?.uid,
        name: user?.displayName,
      });
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  };

  useEffect(() => {
    onAuthStateChanged(auth, (userData) => {
      if (userData) {
        setUser(userData);
      }
    });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        onChangeText={(e) => {
          setUserMessages(e);
        }}
        value={userMessage}
        style={styles.input}
      />

      <TouchableOpacity style={styles.button} onPress={handleSendMessag}>
        <Text style={styles.buttonText}>Inform</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    backgroundColor: colors.light.background,
    flex: 1,
  },
  input: {
    backgroundColor: '#fff',
    height: 40,
    borderRadius: 10,
    padding: 5,
    marginTop: 30,
    marginBottom: 30,
  },
  button: {
    paddingHorizontal: 15,
    paddingTop: 7,
    height: 40,
    borderRightColor: colors.light.borderColor,
    backgroundColor: 'white',
    borderRadius: 13,
    right: 0,
    bottom: 0,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 20,
  },
});

export default InformTab;
