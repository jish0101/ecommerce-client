import { createSlice } from '@reduxjs/toolkit';

const searchProduct = createSlice({
  name: 'searchQuery',
  initialState: {
    search: '',
  },
  reducers: {
    setSearchQuery: (state, action) => {
      state.search = action.payload;
    },
  },
});

export const { setSearchQuery } = searchProduct.actions;
export default searchProduct.reducer;
