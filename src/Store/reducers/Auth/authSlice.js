import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: false,
    user: {},
  },
  reducers: {
    signin: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    logout: (state) => {
      try {
        state.isAuthenticated = false;
        state.user = null;
      } catch (err) {
        console.log(err?.message);
      }
    },
  },
});

export const { signin, logout } = authSlice.actions;
export default authSlice.reducer;
