import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

import { authReducer } from './reducers/auth';
import { postsReducer } from './reducers/posts';

const rootReducer = combineReducers({
  auth: authReducer,
  posts: postsReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export default store;
