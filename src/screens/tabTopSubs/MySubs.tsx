import { StyleSheet, SafeAreaView, View, ScrollView } from 'react-native';

import { DocumentData, collection, doc, getDocs, onSnapshot } from 'firebase/firestore';

import { User, onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';

import { auth, db } from '../../config/firebase';

import Message from '../../components/Message';
import { Text, View as ThemeView } from '../../components/Themed';
import MainButton from '../../components/buttons/MainButton';
import { getSubscriptionsRealTime } from '../../helpers/subscribe';
interface Subscription {
  id: string;
}

const MySabs = ({ navigation }: { navigation: any }) => {
  const [messages, setMessages] = useState<DocumentData[]>([]);
  const [user, setUser] = useState<User>();
  const [subs, setsubs] = useState<Subscription[]>([]);

  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const res = await getSubscriptionsRealTime(user?.uid);
        setsubs(res as Subscription[]);
      } catch (error) {
        console.error('Error fetching subscriptions:', error);
      }
    };

    if (user?.uid) {
      fetchSubscriptions();
    }
  }, [user?.uid]);

  useEffect(() => {
    onAuthStateChanged(auth, (userData) => {
      if (userData) {
        setUser(userData);
      }
    });
  }, []);

  const getData = async (id: DocumentData) => {
    const docRef = doc(db, 'messages', id.foloverId);
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
    if (subs) {
      subs?.map((i: DocumentData) => {
        getData(i);
      });
    }
  }, [subs]);

  return (
    <ThemeView style={styles.container}>
      <ScrollView>
        {messages.length === 0 && <Text style={styles.text}>You are not subscribed to anyone</Text>}

        {messages?.map((item) => {
          return (
            <View key={item.id}>
              <Message name={item.name} message={item.message} time={item.time} />
            </View>
          );
        })}
      </ScrollView>

      <View style={styles.btnWrap}>
        <MainButton
          title="Scan QR code to sudscribe"
          handlePress={() => navigation.navigate('scanscreen')}
        />
        <MainButton title="Generate QR code" handlePress={() => navigation.navigate('qrcode')} />
      </View>
    </ThemeView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    flex: 1,
  },
  text: {
    fontSize: 22,
    textAlign: 'center',
  },
  messageWrap: { gap: 16 },
  btnWrap: {
    gap: 16,
    marginBottom: 16,
  },
});

export default MySabs;
