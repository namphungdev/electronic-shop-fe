import { all, fork } from "redux-saga/effects";
import { authSaga } from "./auth/saga";
import { cartSaga } from "./cart/saga";

export default function* rootSaga() {
  yield all([fork(cartSaga), fork(authSaga)]);
}
