import { put, all, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import { SUBMIT_ACTION } from './constants';
import { ServerDataLoaded, ServerDataLoadingError, FilialDataLoaded } from './actions';

export function* callDataSaga() {
  try {
    const productionsData = yield axios.get('http://manufacture-service-api.dn-kronas.local/api/web/v1/production-area');
    yield put(ServerDataLoaded(productionsData.data));
  } catch (err) {
    yield put(ServerDataLoadingError(err));
  }
}

export function* callFilialId() {
  try {
    const filialData = yield axios.get('http://manufacture-service-api.dn-kronas.local/api/web/v1/filial');
    // console.log('postData.data', postData.data)
    yield put(FilialDataLoaded(filialData.data));
  } catch (err) {
    yield put(ServerDataLoadingError(err));
  }
}

export function* pushData(action) {
  try {
    yield axios.post('http://manufacture-service-api.dn-kronas.local/api/web/v1/production-area', {
      method: 'POST',
      header: 'Data from PostForm',
      name: action.production.name,
      filial_id: +action.production.filial_id,
    });
  } catch (err) {
    yield put(ServerDataLoadingError(err));
  }
}

export function* pushSaga() {
  yield takeEvery(SUBMIT_ACTION, pushData);
}

export function* rootSaga() {
  yield all([
    callDataSaga(),
    pushSaga(),
    callFilialId(),
  ]);
}
export default rootSaga;
