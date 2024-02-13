import { createSlice } from '@reduxjs/toolkit';

export const authKey = 'cloneAppUserId';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: false,
    user: {},
  },
  reducers: {
    signin: (state, action) => {
      localStorage.setItem(
        authKey,
        JSON.stringify({
          id: action.payload.id,
        }),
      );
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
