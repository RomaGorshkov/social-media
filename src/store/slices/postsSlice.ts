import { createAsyncThunk } from '@reduxjs/toolkit';
import { collection, addDoc, query, orderBy, getDocs, doc, setDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';

import { Post } from '../../types/index';

export const fetchAllPosts = createAsyncThunk<Post[]>('posts/fetchAllPosts', async () => {
  const q = query(collection(db, 'posts'), orderBy('createdAt', 'desc'));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<Post, 'id'>),
  }));
});

export const fetchUserPosts = createAsyncThunk<Post[], string>('posts/fetchUserPosts', async (userId) => {
  const postsRef = collection(db, 'users', userId, 'posts'); // <--- Ось правильно
  const querySnapshot = await getDocs(postsRef);
  const userPosts: Post[] = [];

  querySnapshot.forEach((doc) => {
    userPosts.push({ id: doc.id, ...(doc.data() as Omit<Post, 'id'>) });
  });

  return userPosts;
});

export const addNewPost = createAsyncThunk<Post, { title: string; content: string; userId: string }>(
  'posts/addNewPost',
  async ({ title, content, userId }) => {
    if (!userId) throw new Error('User ID is missing!');

    const newPost = {
      title,
      content,
      userId,
      createdAt: Date.now(),
    };

    const docRef = await addDoc(collection(db, 'posts'), newPost);

    const userDocRef = doc(db, 'users', userId);
    await setDoc(userDocRef, { createdAt: Date.now() }, { merge: true });

    const userPostRef = doc(db, 'users', userId, 'posts', docRef.id);
    await setDoc(userPostRef, newPost);

    return { id: docRef.id, ...newPost };
  },
);
