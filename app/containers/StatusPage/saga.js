import { put, all, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import { SUBMIT_ACTION } from './constants';
import { ServerDataLoaded, ServerDataLoadingError } from './actions';


export function* callDataSaga() {
  try {
    const statusData = yield axios.get('http://manufacture-service-api.dn-kronas.local/api/web/v1/order-status');
    // console.log(tehnologyData)
    yield put(ServerDataLoaded(statusData.data));
  } catch (err) {
    yield put(ServerDataLoadingError(err));
  }
}

export function* pushData(action) {
  console.log('eeeeeeee',action)
  try {
    yield axios.post('http://manufacture-service-api.dn-kronas.local/api/web/v1/order-status', {
      method: 'POST',
      header: 'Data from StatusForm',
      name: action.status.name,
      description: action.status.description,
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
  ]);
}
export default rootSaga;
