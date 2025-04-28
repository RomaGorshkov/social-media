import { createSlice } from '@reduxjs/toolkit';

import { addNewPost, fetchAllPosts, fetchUserPosts } from '../slices/postsSlice';
import { Post } from '../../types/index';

interface PostsState {
  allPosts: Post[];
  userPosts: Post[];
  loading: boolean;
  error: string | null;
}

const initialState: PostsState = {
  allPosts: [],
  userPosts: [],
  loading: false,
  error: null,
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.allPosts = action.payload;
      })
      .addCase(fetchAllPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch all posts';
      })

      .addCase(fetchUserPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.userPosts = action.payload;
      })
      .addCase(fetchUserPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch user posts';
      })

      .addCase(addNewPost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addNewPost.fulfilled, (state, action) => {
        state.loading = false;
        state.allPosts.unshift(action.payload);
        state.userPosts.unshift(action.payload);
      })
      .addCase(addNewPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to add new post';
      });
  },
});

export const postsReducer = postsSlice.reducer;
