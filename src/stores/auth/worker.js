import { authService } from "@/services/auth.service";
import { userService } from "@/services/user.service";
import { clearToken, clearUser, getToken, setToken, setUser } from "@/utils";
import handleError from "@/utils/handleError";
import { call, put } from "redux-saga/effects";
import {
  changePasswordByCodeSuccessAction,
  loginSuccessAction,
  onLogout,
  onSetLoadingAuth,
  onSetUser,
  setUserAction,
} from "./authReducer";

export function* loginWorker({ payload: { onSuccess, ...form } } = {}) {
  try {
    yield put(onSetLoadingAuth({ kind: "login", loading: true }));
    const res = yield call(authService.login, form);
    setToken(res?.data);
    const user = yield call(userService.getProfile);
    yield put(setUserAction(user?.data));
    onSuccess?.(user?.data);
    yield put(loginSuccessAction()); //getCart
  } catch (error) {
    handleError(error);
  } finally {
    yield put(onSetLoadingAuth({ kind: "login", loading: false }));
  }
}

export function* logoutWorker() {
  yield put(onLogout());
  clearUser();
  clearToken();
}
export function* setUserWorker({ payload }) {
  setUser(payload); //====localStorage
  yield put(onSetUser(payload)); //state
}

export function* getUserWorker() {
  if (getToken()) {
    try {
      const user = yield call(userService.getProfile);
      setUser(user?.data);
      yield put(onSetUser(user?.data));
    } catch (error) {
      handleError(error);
    }
  }
}

export function* loginByCodeWorker({ payload: { onSuccess, ...code } }) {
  try {
    const res = yield call(authService.loginByCode, code);
    setToken(res?.data);
    const user = yield call(userService.getProfile);
    setUser(user?.data);
    yield put(onSetUser(user?.data));
    onSuccess?.(user?.data);
    yield put(changePasswordByCodeSuccessAction());
  } catch (error) {
    handleError(error);
  }
}

export function* changePasswordByCodeWorker({
  payload: { onSuccess, ...data },
}) {
  try {
    yield put(onSetLoadingAuth({ kind: "changeCode", loading: true }));
    const res = yield call(userService.changePasswordByCode, data);
    setToken(res?.data);
    const user = yield call(userService.getProfile);
    setUser(user?.data);
    yield put(onSetUser(user?.data));
    onSuccess?.(user?.data);
  } catch (error) {
    handleError(error);
  } finally {
    yield put(onSetLoadingAuth({ kind: "changeCode", loading: false }));
  }
}
