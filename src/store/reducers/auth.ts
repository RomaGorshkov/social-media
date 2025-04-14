import { User } from '@/types';
import { createSlice } from '@reduxjs/toolkit';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  error: string;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  error: '',
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
});

export const { setRegisterUser, setLoginUser, setLogoutUser } = authSlice.actions;
export const authReducer = authSlice.reducer;
