import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCNaWX0mDY8PSDd7rgptjGZAPXyLUyVh7A",
  authDomain: "diabetes-292f5.firebaseapp.com",
  projectId: "diabetes-292f5",
  storageBucket: "diabetes-292f5.firebasestorage.app",
  messagingSenderId: "26337651492",
  appId: "1:26337651492:web:105ac67736a8fb0891e1b1",
  measurementId: "G-1N3Y6S8XTH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
