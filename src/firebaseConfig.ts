import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Firebase config object provided from Firebase Console
const firebaseConfig = {
  apiKey: 'AIzaSyC6HrlvLmrlK6D9b2IXGoAURVRUY-dpZ50',
  authDomain: 'spoonful-app.firebaseapp.com',
  projectId: 'spoonful-app',
  storageBucket: 'spoonful-app.appspot.com',
  messagingSenderId: '1062829906183',
  appId: '1:1062829906183:web:947bff0eda850745e74da2',
  measurementId: 'G-413GJ96B1K',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

console.log(firebaseConfig);

// Initialize Firestore database
const db = getFirestore(app);

// Initialize Firebase Auth
const auth = getAuth(app);

export { db, auth };
