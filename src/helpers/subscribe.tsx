import { DocumentData, collection, doc, getDocs, setDoc } from 'firebase/firestore';
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
  const dataRef = doc(db, `users/${foloverId}/mySubscription`, currentUserId);
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

export { Subscribe, SetFolovers, getSubscribers, getSubscriptions };
