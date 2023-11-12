import { StyleSheet, SafeAreaView, Text, View } from 'react-native';

import { DocumentData, collection, doc, getDocs, onSnapshot, setDoc } from 'firebase/firestore';

import { User, onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';

import colors from '../../constants/Colors';

import { auth, db } from '../../config/firebase';

import Message from '../../components/Message';

const MySabs = () => {
  const [messages, setMessages] = useState<DocumentData[]>([]);
  const [user, setUser] = useState<User>();
  const [subs, setsubs] = useState<DocumentData>();

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
      {messages?.map((item) => {
        return (
          <View key={item.id}>
            <Message name={item.name} message={item.message} time={item.time} />
          </View>
        );
      })}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    backgroundColor: colors.light.background,
    flex: 1,
  },
});

export default MySabs;
