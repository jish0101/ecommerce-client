import { createSlice } from '@reduxjs/toolkit';

export const authKey = 'cloneAppUserId';

const initialState = {
  isAuthenticated: false,
  user: {},
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signin: (state, action) => {
      const payload = action.payload;
      state.isAuthenticated = true;
      state.user = payload.user;
    },
    logout: (state) => {
      try {
        state.isAuthenticated = initialState.isAuthenticated;
        state.user = initialState.user;
      } catch (err) {
        console.log(err?.message);
      }
    },
  },
});

export const { signin, logout, setIsTrusted } = authSlice.actions;
export default authSlice.reducer;
