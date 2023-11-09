import { StyleSheet, SafeAreaView, TouchableOpacity, Text } from 'react-native';

import { DocumentData, collection, doc, getDocs, onSnapshot, setDoc } from 'firebase/firestore';

import { User, onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { TextInput } from 'react-native-gesture-handler';
import colors from '../constants/Colors';
import SmallButton from '../components/buttons/SmallButton';
import { auth, db, logOut } from '../config/firebase';
import { View } from '../components/Themed';

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
});

const ProfileScreen = () => {
  const [messages, setMessages] = useState<DocumentData[]>([]);
  const [userMessage, setUserMessages] = useState<string>('');
  const [user, setUser] = useState<User>();
  const [subs, setsubs] = useState<DocumentData>();

  const subscribe = async () => {
    if (!user?.uid) return;
    const dataRef = doc(db, `users/${user?.uid}/subscription`, user?.uid);
    setDoc(dataRef, {
      id: user?.uid,
    });
  };

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
    const getData = async () => {
      const val = doc(db, `users/${user?.uid}`);
      const docRef = collection(val, 'subscription');
      const docSnap = await getDocs(docRef);

      setsubs(docSnap.docs.map((d) => ({ ...d.data(), d })));
    };
    getData();
  }, [user?.uid]);

  useEffect(() => {
    onAuthStateChanged(auth, (userData) => {
      if (userData) {
        setUser(userData);
      }
    });
  }, []);

  const getData = async (id: DocumentData) => {
    const docRef = doc(db, 'messages', id.id);
    const unsub = onSnapshot(docRef, (mes) => {
      if (mes.exists()) {
        const updatedMessage = mes.data();
        setMessages((prev) => {
          const index = prev.findIndex((msg) => msg.id === updatedMessage.id);
          if (index !== -1) {
            const newMessages = [...prev];
            newMessages[index] = updatedMessage;
            return newMessages;
          }
          return [...prev, updatedMessage];
        });
      }
    });
    return unsub;
  };

  console.log('messages :>> ', messages);
  useEffect(() => {
    subs?.map((i: DocumentData) => {
      return getData(i);
    });
  }, [subs]);

  return (
    <SafeAreaView style={styles.container}>
      <SmallButton title="Logout" handlePress={logOut} />

      <TextInput
        onChangeText={(e) => {
          setUserMessages(e);
        }}
        value={userMessage}
        style={styles.input}
      />
      {messages?.map(({ name, message, id }) => (
        <View key={id} style={{ backgroundColor: 'white', margin: 10 }}>
          <Text>{name}</Text>
          <Text>{message}</Text>
        </View>
      ))}

      <TouchableOpacity style={styles.button} onPress={subscribe}>
        <Text style={styles.buttonText}>Subscribe</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleSendMessag}>
        <Text style={styles.buttonText}>Send Message</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};
export default ProfileScreen;
