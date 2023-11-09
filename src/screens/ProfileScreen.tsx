import { StyleSheet, SafeAreaView, TouchableOpacity, Text, View } from 'react-native';

import { DocumentData, collection, doc, getDocs, onSnapshot, setDoc } from 'firebase/firestore';
import { User, onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { TextInput } from 'react-native-gesture-handler';
import { useTheme } from '@react-navigation/native';

import { auth, db } from '../config/firebase';

import Message from '../components/Message';
import { BaseTheme } from '../constants/Colors';

const ProfileScreen = () => {
  const [messages, setMessages] = useState<DocumentData[]>([]);
  const [userMessage, setUserMessages] = useState<string>('');
  const [user, setUser] = useState<User>();
  const [subs, setsubs] = useState<DocumentData>();
  const colors = useTheme().colors as BaseTheme;
console.log(colors);

  const styles = StyleSheet.create({
    container: {
      paddingHorizontal: 16,
      borderRightColor: colors.background,
      // todo colors.light.borderColor
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
      borderRightColor: colors.background,
      // todo colors.light.borderColor
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

  const subscribe = async (id: string) => {
    if (!user?.uid) return;
    const dataRef = doc(db, `users/${user?.uid}/subscription`, id);
    setDoc(dataRef, {
      id,
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

  useEffect(() => {
    subs?.map((i: DocumentData) => {
      return getData(i);
    });
  }, [subs]);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>My subscriptions</Text>
      {messages?.map((item) => {
        return (
          <View key={item.id}>
            <Message name={item.name} message={item.message} time={item.time} />
          </View>
        );
      })}
      <Text style={styles.title}>My inform</Text>
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



export default ProfileScreen;
