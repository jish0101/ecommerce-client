import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/Auth/authSlice.js';

export const store = configureStore({
  reducer: {
    auth: authReducer
  }
});
