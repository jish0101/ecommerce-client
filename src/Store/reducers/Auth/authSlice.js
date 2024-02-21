import { createSlice } from '@reduxjs/toolkit';

export const authKey = 'cloneAppUserId';

const initialState = {
  isAuthenticated: false,
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signin: (state, action) => {
      const auth = JSON.parse(localStorage.getItem(authKey));
      if (!auth) {
        localStorage.setItem(
          authKey,
          JSON.stringify({
            _id: action.payload._id,
          }),
        );
      }
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      try {
        localStorage.removeItem(authKey);
        state.isAuthenticated = initialState.isAuthenticated;
        state.user = initialState.user;
      } catch (err) {
        console.log(err?.message);
      }
    },
  },
});

export const { signin, logout, setUser } = authSlice.actions;
export default authSlice.reducer;
