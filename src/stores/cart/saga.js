import { takeLatest } from "redux-saga/effects";
import {
  changePasswordByCodeSuccessAction,
  loginSuccessAction,
  logoutAction,
} from "../auth/authReducer";
import {
  clearCartAction,
  deleteCartAction,
  getCartAction,
  getPromotionAction,
  removePromotionAction,
  setCartAction,
  setPreCheckoutDataAction,
  setPreCheckoutDataInitialAction,
  setPreCheckoutDataSuccessAction,
  setPreCheckoutResAction,
  updateCartAction,
  updateCartQuantitySuccessAction,
} from "./cartReducer";
import {
  clearCartWorker,
  deleteCartWorker,
  getCartWorker,
  getPreCheckoutResWorker,
  getPromotionWorker,
  removePromotionWorker,
  setCartWorker,
  setPreCheckoutDataInitialWorker,
  setPreCheckoutDataWorker,
  setPreCheckoutResWorker,
  updateCartWorker,
} from "./worker";

export function* cartSaga() {
  yield takeLatest(updateCartAction, updateCartWorker);
  yield takeLatest(deleteCartAction, deleteCartWorker);
  yield takeLatest(
    [getCartAction, loginSuccessAction, changePasswordByCodeSuccessAction],
    getCartWorker
  );
  yield takeLatest([clearCartAction, logoutAction], clearCartWorker);
  yield takeLatest(setCartAction, setCartWorker);

  yield takeLatest(setPreCheckoutDataAction, setPreCheckoutDataWorker);
  yield takeLatest(
    [setPreCheckoutDataInitialAction, loginSuccessAction],
    setPreCheckoutDataInitialWorker
  );
  yield takeLatest(setPreCheckoutResAction, setPreCheckoutResWorker);
  yield takeLatest(
    [updateCartQuantitySuccessAction, setPreCheckoutDataSuccessAction],
    getPreCheckoutResWorker
  );
  yield takeLatest(getPromotionAction, getPromotionWorker);
  yield takeLatest(removePromotionAction, removePromotionWorker);
}
