import { getUser } from "@/utils/storage";
import { createAction, createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  initialState: () => ({
    user: getUser(),
    status: "idle",
    loading: {},
  }),
  name: "auth",
  reducers: {
    onLogout: (state) => {
      state.user = null;
    },
    onSetUser: (state, { payload }) => {
      state.user = payload;
    },
    onSetLoadingAuth: (state, { payload: { kind, loading } = {} } = {}) => {
      state.loading[kind] = loading;
    },
  },
});
export default authSlice.reducer;
export const {
  actions: { onLogout, onSetUser, onSetLoadingAuth },
  name,
  getInitialState,
} = authSlice;

export const loginAction = createAction(`${name}/login`);
export const loginSuccessAction = createAction(`${name}/login-success`);
export const logoutAction = createAction(`${name}/logout`);
export const setUserAction = createAction(`${name}/setUser`);
export const getUserAction = createAction(`${name}/getUser`);
export const loginByCodeAction = createAction(`${name}/login-by-code`);
export const changePasswordByCodeAction = createAction(
  `${name}/change-password-by-code`
);
export const changePasswordByCodeSuccessAction = createAction(
  `${name}/change-password-by-code-success`
);
