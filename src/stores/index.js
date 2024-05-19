import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import authReducer, { getUserAction } from "./auth/authReducer";
import cacheReducer from "./cacheReducer";
import cartReducer, { getCartAction } from "./cart/cartReducer";
import drawerReducer from "./drawerReducer";
import rootSaga from "./rootSaga";

const reducer = {
  auth: authReducer,
  cache: cacheReducer,
  drawer: drawerReducer,
  cart: cartReducer,
};
const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer,
  middleware: (gDM) =>
    gDM({
      serializableCheck: false,//tắt lỗi a non-serialize
    }).concat(sagaMiddleware),
  devTools: import.meta.env.VITE_ENV === "development",
});

sagaMiddleware.run(rootSaga);

store.dispatch(getUserAction());
store.dispatch(getCartAction());
export default store;
