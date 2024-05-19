import { getCart, getPreckoutData, getPreckoutResponse } from "@/utils";
import { createAction, createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: () => ({
    cart: getCart(),
    open: false,
    loading: {},
    preCheckoutData: getPreckoutData(),
    preCheckoutResponse: getPreckoutResponse(),
  }),
  reducers: {
    onSetCart: (state, { payload }) => {
      state.cart = payload;
    },
    onSetOpenCart: (state, { payload }) => {
      state.open = payload;
    },
    onSetLoading: (state, { payload: { id, loading } = {} } = {}) => {
      state.loading[id] = loading;
    },
    onSetPreCheckoutData: (state, { payload }) => {
      state.preCheckoutData = payload;
    },
    onSetPreCheckoutRes: (state, { payload }) => {
      state.preCheckoutResponse = payload;
    },
  },
});
export default cartSlice.reducer;
export const {
  actions: {
    onSetCart,
    onSetOpenCart,
    onUpdateCart,
    onSetLoading,
    onSetPreCheckoutData,
    onSetPreCheckoutRes,
  },
  name,
  getInitialState: cartState,
} = cartSlice;
export const updateCartAction = createAction(`${name}/update`);
export const deleteCartAction = createAction(`${name}/delete`);
export const getCartAction = createAction(`${name}/get`);
export const clearCartAction = createAction(`${name}/clear`);
export const setCartAction = createAction(`${name}/set`);
// ====
export const setPreCheckoutDataAction = createAction(
  `${name}/setPreCheckoutData`
);

export const setPreCheckoutDataInitialAction = createAction(
  `${name}/setPreCheckoutDataInitial`
);
export const setPreCheckoutResAction = createAction(
  `${name}/setPreCheckoutRes`
);
export const updateCartQuantitySuccessAction = createAction(
  `${name}/updateQuantitySuccess`
);
export const setPreCheckoutDataSuccessAction = createAction(
  `${name}/setPreCheckoutDataSuccess`
);
export const getPromotionAction = createAction(`${name}/getPromotion`);
export const removePromotionAction = createAction(`${name}/removePromotion`);
