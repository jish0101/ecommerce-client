import { createSlice } from '@reduxjs/toolkit';

const loaderSlice = createSlice({
  name: 'loader',
  initialState: {
    isLoading: false,
    isError: null,
  },
  reducers: {
    toggleLoading: (state) => {
      state.isLoading = !state.isLoading;
    },
    startLoading: (state) => {
      state.isLoading = true;
    },
    endLoading: (state) => {
      state.isLoading = false;
    },
  },
});

export const { toggleLoading, startLoading, endLoading } = loaderSlice.actions;

export default loaderSlice.reducer;
