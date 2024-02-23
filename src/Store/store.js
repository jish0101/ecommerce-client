import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/Auth/authSlice.js';
import loaderReducer from './reducers/globalLoader/loaderSlice.js';
import productCategorySlice from './reducers/ProductCateogory/productCategorySlice.js';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    loader: loaderReducer,
    productCategories: productCategorySlice,
  },
});
