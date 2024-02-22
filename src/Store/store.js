import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/Auth/authSlice.js';
import loaderReducer from './reducers/globalLoader/loaderSlice.js';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    loader: loaderReducer,
  },
});
