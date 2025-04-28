import { createAsyncThunk } from '@reduxjs/toolkit';
import { collection, addDoc, query, orderBy, getDocs, doc, setDoc, deleteDoc } from 'firebase/firestore';
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
  const postsRef = collection(db, 'users', userId, 'posts');
  const querySnapshot = await getDocs(postsRef);
  const posts: Post[] = [];
  querySnapshot.forEach((doc) => {
    posts.push({
      id: doc.id,
      ...doc.data(),
    } as Post);
  });
  return posts;
});

export const addNewPost = createAsyncThunk<Post, { title: string; content: string; userId: string }>(
  'posts/addNewPost',
  async ({ title, content, userId }) => {
    const createdAt = Date.now();

    const newPost = {
      title,
      content,
      userId,
      createdAt,
    };

    const docRef = await addDoc(collection(db, 'posts'), newPost);

    const postWithId = {
      id: docRef.id,
      ...newPost,
    };

    const userPostRef = doc(db, 'users', userId, 'posts', docRef.id);
    await setDoc(userPostRef, postWithId);

    return postWithId;
  },
);

export const deletePost = createAsyncThunk<string, { postId: string; userId: string }>(
  'posts/deletePost',
  async ({ postId, userId }) => {
    await deleteDoc(doc(db, 'posts', postId));

    await deleteDoc(doc(db, 'users', userId, 'posts', postId));

    return postId;
  },
);
