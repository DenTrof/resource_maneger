import { put, all, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import { SUBMIT_ACTION } from './constants';
import { ServerDataLoaded, ServerDataLoadingError } from './actions';

export function* callDataSaga() {
  try {
    const positionData = yield axios.get('http://manufacture-service-api.dn-kronas.local/api/web/v1/employees/employees-shift?id=3');
    yield put(ServerDataLoaded(positionData.data));
  } catch (err) {
    yield put(ServerDataLoadingError(err));
  }
}

export function* pushData(action) {
  try {
    yield axios.post('http://manufacture-service-api.dn-kronas.local/api/web/v1/positions', {
      method: 'POST',
      header: 'Data from PositionForm',
      name: action.position.name,
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
