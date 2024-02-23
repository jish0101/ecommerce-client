import { createSlice } from '@reduxjs/toolkit';

export const authKey = 'cloneAppUserId';

const initialState = {
  isAuthenticated: false,
  isTrusted: true,
  user: {},
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signin: (state, action) => {
      const payload = action.payload;
      const isPersist = payload?.isTrusted;
      if (isPersist) {
        localStorage.setItem(
          authKey,
          JSON.stringify({
            _id: action.payload.user._id,
          }),
        );
      }
      state.isAuthenticated = true;
      state.user = payload.user;
      if (payload.isTrusted) {
        state.isTrusted = payload.isTrusted;
      }
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

export const { signin, logout, setIsTrusted } = authSlice.actions;
export default authSlice.reducer;
