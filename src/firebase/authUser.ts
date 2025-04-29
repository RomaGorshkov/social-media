import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  signOut,
  sendEmailVerification,
} from 'firebase/auth';

import { auth } from './config';

export const registerUser = async (username: string, email: string, password: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    await updateProfile(user, {
      displayName: username,
    });

    await sendEmailVerification(user);
    console.log('Verification letter sent to: ', user.email);

    return user;
  } catch (error: unknown) {
    console.error('Error registering user:', error);
    throw error;
  }
};

export const loginUser = async (email: string, password: string, rememberMe: boolean) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    if (!user.emailVerified) {
      const error = new Error('Please verify your email before logging in.');

      (error as any).code = 'auth/email-not-verified';
      throw error;
    }

    if (rememberMe) {
      localStorage.setItem('firebase_token', user.refreshToken);
    }

    return user;
  } catch (error: unknown) {
    console.error('Error logging in user:', error);
    throw error;
  }
};

export const logoutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error('Logout error:', error);
    throw error;
  }
};
