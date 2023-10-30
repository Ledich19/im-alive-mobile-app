import { initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  initializeAuth,
  getReactNativePersistence,
  updateProfile,
  User,
} from 'firebase/auth';

import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: 'AIzaSyC59GcrqGUhPJebXSLYzF-XJ-sqBSCoDLk',
  authDomain: 'im-alive-7636f.firebaseapp.com',
  projectId: 'im-alive-7636f',
  storageBucket: 'im-alive-7636f.appspot.com',
  messagingSenderId: '60570761594',
  appId: '1:60570761594:web:59356146ad789c19cabec3',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

export const auth = getAuth();

export const register = (email: string, password: string) =>
  createUserWithEmailAndPassword(auth, email, password);

export const login = (email: string, password: string) =>
  signInWithEmailAndPassword(auth, email, password);

export const updateProfileDate = (user: User, data: { name?: string; url?: string }) => {
  if (user) {
    updateProfile(user as User, {
      displayName: data.name || null,
      photoURL: data.url || null,
    });
  }
};

export const resetPassword = (email: string) => sendPasswordResetEmail(auth, email);

export const logOut = () => signOut(auth);
