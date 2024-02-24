import { createSlice } from '@reduxjs/toolkit';

const selectedCategorySlice = createSlice({
  name: 'selectedCategory',
  initialState: {
    category: null,
  },
  reducers: {
    setSelectedCategory: (state, action) => {
      state.category = action.payload;
    },
  },
});

export const { setSelectedCategory } = selectedCategorySlice.actions;
export default selectedCategorySlice.reducer;
