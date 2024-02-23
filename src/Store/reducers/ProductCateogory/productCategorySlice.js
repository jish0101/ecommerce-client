import { createSlice } from '@reduxjs/toolkit';

const productCategorySlice = createSlice({
  name: 'productCategories',
  initialState: {
    productCategories: [],
  },
  reducers: {
    setProductCategories: (state, { payload }) => {
      state.productCategories = payload;
    },
  },
});

export const { setProductCategories } = productCategorySlice.actions;
export default productCategorySlice.reducer;
