import { configureStore } from '@reduxjs/toolkit';
import authReducer, { authKey } from './reducers/Auth/authSlice.js';
import loaderReducer from './reducers/globalLoader/loaderSlice.js';
import productCategorySlice from './reducers/ProductCateogory/productCategorySlice.js';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: authKey,
  storage,
  // whitelist: ['isAuthenticated', 'isTrusted', 'user'],
};

const persistedReducer = persistReducer(persistConfig, authReducer);

export const store = configureStore({
  reducer: {
    auth: persistedReducer,
    loader: loaderReducer,
    productCategories: productCategorySlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
