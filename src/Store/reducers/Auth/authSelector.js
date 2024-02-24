export const selectRole = (state) => state.auth.user.role;
export const selectIsAuth = (state) => state.auth.isAuthenticated;
export const selectIsTrusted = (state) => state.auth.isTrusted;
export const selectUser = (state) => state?.auth?.user;
export const selectToken = (state) => state?.auth?.user?.token;
