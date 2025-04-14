import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyAT6yNxG43dQGdGLuJAVFIyT45GZ8ZTUlc',
  authDomain: 'crypto-club-bc2db.firebaseapp.com',
  projectId: 'crypto-club-bc2db',
  storageBucket: 'crypto-club-bc2db.firebasestorage.app',
  messagingSenderId: '48146971973',
  appId: '1:48146971973:web:84c8fb24adc4a5e1cc922c',
  measurementId: 'G-L4TVJG02RP',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
