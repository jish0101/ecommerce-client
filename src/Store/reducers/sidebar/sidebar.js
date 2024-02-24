import { createSlice } from '@reduxjs/toolkit';

const sidebarSlice = createSlice({
  initialState: {
    isSidebarOpen: false,
  },
  name: 'sidebar',
  reducers: {
    toggleSidebar: (state, action) => {
      if (action && action.payload) {
        state.isSidebarOpen = action.payload;
      } else {
        state.isSidebarOpen = !state.isSidebarOpen;
      }
    },
  },
});

export const { toggleSidebar } = sidebarSlice.actions;

export default sidebarSlice.reducer;
