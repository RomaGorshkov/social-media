import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  getAuth,
  signOut,
} from 'firebase/auth';

import { auth } from './config';

export const getFirebaseToken = async () => {
  const user = getAuth().currentUser;
  if (user) {
    const token = await user.getIdToken(true);
    return token;
  } else {
    throw new Error('User is not authenticated');
  }
};

export const registerUser = async (username: string, email: string, password: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    await updateProfile(user, {
      displayName: username,
    });

    const token = await getFirebaseToken();

    localStorage.setItem('firebaseToken', token);

    return user;
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
};

export const loginUser = async (email: string, password: string, rememberMe: boolean) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    const token = await user.getIdToken();

    if (rememberMe) {
      localStorage.setItem('firebase_token', token);
    } else {
      sessionStorage.setItem('firebase_token', token);
    }
    return user;
  } catch (error) {
    console.error('Error logging in user:', error);
    throw error;
  }
};

export const logoutUser = async () => {
  try {
    await signOut(auth);
    localStorage.removeItem('firebase_token');
    sessionStorage.removeItem('firebase_token');
  } catch (error) {
    console.error('Logout error:', error);
    throw error;
  }
};
