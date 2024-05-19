import { cartService } from "@/services/cart.service";
import {
  clearCart,
  clearPreckoutData,
  clearPreckoutResponse,
  getToken,
  handleToastMessage,
  setCart,
  setPreckoutData,
  setPreckoutResponse,
} from "@/utils";
import handleError from "@/utils/handleError";
import {
  call,
  delay,
  put,
  putResolve,
  race,
  select,
  take,
} from "redux-saga/effects";
import { onLogout } from "../auth/authReducer";
import {
  getCartAction,
  onSetCart,
  onSetLoading,
  onSetOpenCart,
  onSetPreCheckoutData,
  onSetPreCheckoutRes,
  setCartAction,
  setPreCheckoutDataAction,
  setPreCheckoutDataSuccessAction,
  setPreCheckoutResAction,
  updateCartQuantitySuccessAction,
} from "./cartReducer";

export function* updateCartWorker({
  payload: { id, data, toast = false, pending, success, alert } = {},
} = {}) {
  try {
    yield delay(300);
    yield put(onSetLoading({ id, loading: true }));
    if (toast) {
      yield call(handleToastMessage, {
        promise: () => cartService.updateQuantity(id, data),
        pending: pending,
        success: success,
      });
    } else {
      yield call(cartService.updateQuantity, id, data);
    }
    yield putResolve(getCartAction());
    if (alert) {
      window.scroll({
        top: 0,
        behavior: "smooth",
      });
      yield putResolve(onSetOpenCart(true));
    }
    yield put(updateCartQuantitySuccessAction(id));
  } catch (error) {
    console.error(error);
  } finally {
    yield put(onSetLoading({ id, loading: false }));
  }
}

export function* deleteCartWorker({ payload: id } = {}) {
  try {
    yield put(onSetLoading({ id, loading: true }));
    yield call(cartService.removeItem, id);
    yield putResolve(getCartAction());
    const {
      cart: { preCheckoutData },
    } = yield select();
    let listItems = preCheckoutData.listItems;
    if (listItems.find((e) => e === id)) {
      listItems = listItems.filter((e) => e !== id);
      yield put(setPreCheckoutDataAction({ ...preCheckoutData, listItems }));
    }
  } catch (error) {
    console.error(error);
  } finally {
    yield put(onSetLoading({ id, loading: false }));
  }
}

export function* getCartWorker() {
  if (getToken()) {
    yield put(onSetLoading({ id: "getCart", loading: true }));
    try {
      const { cart } = yield race({
        cart: call(cartService.getCart),
        logout: take(onLogout),
      });
      if (cart) {
        yield putResolve(setCartAction(cart?.data));
      }
    } catch (error) {
      handleError(error);
    } finally {
      yield put(onSetLoading({ id: "getCart", loading: false }));
    }
  }
}

export function* setCartWorker({ payload: data } = {}) {
  setCart(data); //localStorage
  yield put(onSetCart(data)); //state
}

export function* clearCartWorker() {
  clearCart();
  yield put(onSetCart(null));

  clearPreckoutData();
  yield put(onSetPreCheckoutData({}));

  clearPreckoutResponse();
  yield put(onSetPreCheckoutRes({}));
}

export function* setPreCheckoutDataInitialWorker() {
  yield put(
    setPreCheckoutDataAction({
      listItems: [],
      promotionCode: [],
      shippingMethod: "mien-phi",
    })
  );
}
export function* setPreCheckoutDataWorker({ payload }) {
  setPreckoutData(payload); //localStorage
  yield put(onSetPreCheckoutData(payload)); //state
  yield put(setPreCheckoutDataSuccessAction()); //call api preCheckout
}

export function* setPreCheckoutResWorker({ payload }) {
  setPreckoutResponse(payload); //localStorage
  yield put(onSetPreCheckoutRes(payload)); // state
}

export function* getPreCheckoutResWorker({ type, payload }) {
  const {
    cart: { preCheckoutData },
  } = yield select();
  yield put(onSetLoading({ id: "checkout-board", loading: true }));
  try {
    if (type === updateCartQuantitySuccessAction.toString()) {
      if (!preCheckoutData?.listItems?.includes(payload)) return;
    }

    const res = yield call(cartService.preCheckout, preCheckoutData);
    yield putResolve(setPreCheckoutResAction(res?.data));
  } catch (error) {
    handleError(error);
  } finally {
    yield put(onSetLoading({ id: "checkout-board", loading: false }));
  }
}
export function* getPromotionWorker({
  payload: { code, onSuccess, onError } = {},
} = {}) {
  const {
    cart: { preCheckoutData },
  } = yield select();
  try {
    yield put(onSetLoading({ id: "loadingPromotion", loading: true }));
    yield delay(500);
    const res = yield call(cartService.getPromotion, code);
    yield putResolve(
      setPreCheckoutDataAction({
        ...preCheckoutData,
        promotionCode: [res?.data?.code],
      })
    );
    onSuccess?.();
  } catch (error) {
    onError(error);
  } finally {
    yield putResolve(onSetLoading({ id: "loadingPromotion", loading: false }));
  }
}

export function* removePromotionWorker({ payload: { onSuccess } } = {}) {
  const {
    cart: { preCheckoutData },
  } = yield select();

  yield putResolve(
    setPreCheckoutDataAction({ ...preCheckoutData, promotionCode: [] })
  );
  onSuccess?.();
}
