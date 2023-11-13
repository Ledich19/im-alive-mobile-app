import { DocumentData, collection, doc, getDocs, setDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { useState } from 'react';

const subscribe = async (currentUserId: string, subscriberId: string) => {
  if (!currentUserId) return;
  const dataRef = doc(db, `users/${currentUserId}/subscription`, subscriberId);
  setDoc(dataRef, {
    subscriberId,
  });
};

const mySubscribers = async (subscriberId: string, currentUserId: string) => {
  if (!subscriberId) return;
  const dataRef = doc(db, `users/${subscriberId}/mySubscription`, currentUserId);
  setDoc(dataRef, {
    currentUserId,
  });
};

const getSubscribers = async (currentUserId: string) => {
  const [subs, setsubs] = useState<DocumentData>();
  const val = doc(db, `users/${currentUserId}`);
  const docRef = collection(val, 'mySubscription');
  const docSnap = await getDocs(docRef);
  setsubs(docSnap.docs.map((d) => ({ ...d.data(), d })));
  return subs;
};

const getSubscriptions = async (currentUserId: string | undefined) => {
  const val = doc(db, `users/${currentUserId}`);
  const docRef = collection(val, 'subscription');
  const docSnap = await getDocs(docRef);
  return docSnap.docs.map((d) => d.data());
};

export { subscribe, mySubscribers, getSubscribers, getSubscriptions };
