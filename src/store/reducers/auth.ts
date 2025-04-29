import { createSlice } from '@reduxjs/toolkit';

import { User } from '../../types/index';
import { updateUserProfile } from '../slices/updateUserProfileSlice';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setRegisterUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    setLoginUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    setLogoutUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        console.log('User profile updated successfully:', action.payload);
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to update user profile';
      });
  },
});

export const { setRegisterUser, setLoginUser, setLogoutUser } = authSlice.actions;
export const authReducer = authSlice.reducer;
