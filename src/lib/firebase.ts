// src/lib/firebase.ts
import { initializeApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyC6LBC2fUYe5LLXV32q2j1hPaWtIGX4YbY",
  authDomain: "polya-gm.firebaseapp.com",
  projectId: "polya-gm",
  storageBucket: "polya-gm.firebasestorage.app",
  messagingSenderId: "747961256",
  appId: "1:747961256:web:3b1e59c9e46ae7c5647b9d"
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
export const db = getFirestore(app);