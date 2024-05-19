import { takeLatest } from "redux-saga/effects";
import {
  changePasswordByCodeAction,
  getUserAction,
  loginAction,
  loginByCodeAction,
  logoutAction,
  setUserAction
} from "./authReducer";
import {
  changePasswordByCodeWorker,
  getUserWorker,
  loginByCodeWorker,
  loginWorker,
  logoutWorker,
  setUserWorker
} from "./worker";

export function* authSaga() {
  yield takeLatest(loginAction, loginWorker);
  yield takeLatest(logoutAction, logoutWorker);
  yield takeLatest(setUserAction, setUserWorker);
  yield takeLatest(getUserAction, getUserWorker);
  yield takeLatest(loginByCodeAction, loginByCodeWorker);
  yield takeLatest(changePasswordByCodeAction, changePasswordByCodeWorker);
}
