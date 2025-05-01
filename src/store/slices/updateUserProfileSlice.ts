import { createAsyncThunk } from '@reduxjs/toolkit';
import { updateProfile, EmailAuthProvider, reauthenticateWithCredential, verifyBeforeUpdateEmail } from 'firebase/auth';
import { FirebaseError } from 'firebase/app';
import { doc, updateDoc } from 'firebase/firestore';

import { auth, db } from '../../firebase/config';
import { EditUserSchema } from '../../types/index';

export const updateUserProfile = createAsyncThunk(
  'auth/updateUserProfile',
  async ({ displayName, photoURL, email, currentPassword }: EditUserSchema) => {
    const user = auth.currentUser;

    if (!user || !user.email) {
      throw new FirebaseError('auth/user-not-authenticated', 'User not authenticated or email not available');
    }

    if (!currentPassword) {
      throw new FirebaseError('auth/missing-password', 'Current password is required for reauthentication');
    }

    try {
      const credential = EmailAuthProvider.credential(user.email, currentPassword);
      await reauthenticateWithCredential(user, credential);

      if (email && email !== user.email) {
        await verifyBeforeUpdateEmail(user, email);
        await updateProfile(user, { displayName, photoURL });
        const userDocRef = doc(db, 'users', user.uid);
        await updateDoc(userDocRef, { displayName, photoURL, emailPending: email });

        return {
          uid: user.uid,
          displayName,
          photoURL,
          email: user.email,
        };
      } else {
        await updateProfile(user, { displayName, photoURL });
        const userDocRef = doc(db, 'users', user.uid);
        await updateDoc(userDocRef, { displayName, photoURL });

        return {
          uid: user.uid,
          displayName,
          photoURL,
          email: user.email,
        };
      }
    } catch (error: any) {
      if (error instanceof FirebaseError) {
        throw error;
      }

      throw new FirebaseError('auth/unknown-error', 'An unknown error occurred');
    }
  },
);
