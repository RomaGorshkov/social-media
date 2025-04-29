import { createAsyncThunk } from '@reduxjs/toolkit';
import { updateProfile, updateEmail } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';

import { auth, db } from '../../firebase/config';
import { EditUserSchema } from '../../types/index';

export const updateUserProfile = createAsyncThunk(
  'auth/updateUserProfile',
  async ({ displayName, photoURL, email }: EditUserSchema) => {
    const user = auth.currentUser;
    console.log('user', user);

    if (!user) throw new Error('User not authenticated');

    await updateProfile(user, { displayName, photoURL });

    if (email && email !== user.email) {
      await updateEmail(user, email);
    }

    const userDocRef = doc(db, 'users', user.uid);
    await updateDoc(userDocRef, { displayName, photoURL, email });

    return { uid: user.uid, displayName, photoURL, email };
  },
);
