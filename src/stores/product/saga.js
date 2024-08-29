// sagas.ts
import { call, put, takeLatest } from 'redux-saga/effects';
import { addProductFailure, addProductSuccess } from './productAction';
import { ADD_PRODUCT_REQUEST } from './productType';

function* addProductSaga(action) {
  try {
    // Giả sử bạn có một hàm API để thêm sản phẩm
    const product = yield call(api.addProduct, action.payload);
    yield put(addProductSuccess(product));
  } catch (error) {
    yield put(addProductFailure(error.message));
  }
}

export default function* watchProductSaga() {
  yield takeLatest(ADD_PRODUCT_REQUEST, addProductSaga);
}
