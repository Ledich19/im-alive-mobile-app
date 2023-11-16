import { DocumentData, collection, doc, getDocs, onSnapshot, setDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { useState } from 'react';

const Subscribe = async (currentUserId: string, foloverId: string) => {
  if (!currentUserId) return;
  const dataRef = doc(db, `users/${currentUserId}/subscription`, foloverId);
  setDoc(dataRef, {
    foloverId,
  });
};

const SetFolovers = async (foloverId: string, currentUserId: string) => {
  if (!foloverId) return;
  const dataRef = doc(db, `users/${foloverId}/folovers`, currentUserId);
  setDoc(dataRef, {
    currentUserId,
  });
};

const getFolovers = async (currentUserId: string) => {
  const [subs, setsubs] = useState<DocumentData>();
  const val = doc(db, `users/${currentUserId}`);
  const docRef = collection(val, 'folovers');
  const docSnap = await getDocs(docRef);
  setsubs(docSnap.docs.map((d) => ({ ...d.data(), d })));
  return subs;
};

const getFoloversRealTime = (currentUserId: string | undefined) => {
  if (!currentUserId) {
    return Promise.reject('No user ID provided');
  }
  const userRef = doc(db, `users/${currentUserId}`);
  const subscriptionRef = collection(userRef, 'folovers');

  return new Promise((resolve, reject) => {
    const unsubscribe = onSnapshot(
      subscriptionRef,
      (snapshot) => {
        const subscriptions = snapshot.docs.map((doc) => doc.data());
        resolve(subscriptions);
      },
      (error) => {
        reject(error);
      }
    );
    return unsubscribe;
  });
};

const getSubscriptionsRealTime = (currentUserId: string | undefined) => {
  if (!currentUserId) {
    return Promise.reject('No user ID provided');
  }
  const userRef = doc(db, `users/${currentUserId}`);
  const subscriptionRef = collection(userRef, 'subscription');

  return new Promise((resolve, reject) => {
    const unsubscribe = onSnapshot(
      subscriptionRef,
      (snapshot) => {
        const subscriptions = snapshot.docs.map((doc) => doc.data());
        resolve(subscriptions);
      },
      (error) => {
        reject(error);
      }
    );
    return unsubscribe;
  });
};

export { Subscribe, SetFolovers, getFolovers, getSubscriptionsRealTime, getFoloversRealTime };
