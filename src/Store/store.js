import { configureStore } from '@reduxjs/toolkit';
import authReducer, { authKey } from './reducers/Auth/authSlice.js';
import loaderReducer from './reducers/globalLoader/loaderSlice.js';
import sidebarReducer from './reducers/sidebar/sidebar.js';
import selectedCategorySliceReducer from './reducers/SelectedCategory/selectedCategorySlice.js';
import searchProductReducer from './reducers/searchProduct/searchProduct.js';
import cartReducer from './reducers/cartReducer/cartReducer.js';
import storage from 'redux-persist/lib/storage';
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

const persistConfig = {
  key: authKey,
  storage,
};

const persistedReducer = persistReducer(persistConfig, authReducer);

export const store = configureStore({
  reducer: {
    auth: persistedReducer,
    loader: loaderReducer,
    sidebar: sidebarReducer,
    selectedCategory: selectedCategorySliceReducer,
    searchQuery: searchProductReducer,
    cart: cartReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
