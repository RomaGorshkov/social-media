import { createSlice } from '@reduxjs/toolkit';

import { User } from '../../types/index';
import { updateUserProfile } from '../slices/updateUserProfileSlice';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
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
    userProfileUpdated: (state, action) => {
      state.user = {
        ...state.user,
        ...action.payload,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateUserProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateUserProfile.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(updateUserProfile.rejected, (state) => {
        state.isLoading = false;
        state.error = 'Failed to update user profile';
      });
  },
});

export const { setRegisterUser, setLoginUser, setLogoutUser, userProfileUpdated } = authSlice.actions;
export const authReducer = authSlice.reducer;
