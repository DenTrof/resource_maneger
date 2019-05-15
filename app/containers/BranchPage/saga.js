import { put, all, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import { SUBMIT_ACTION } from './constants';
import { ServerDataLoaded, ServerDataLoadingError } from './actions';


export function* callDataSaga() {
  try {
    const branchData = yield axios.get('http://manufacture-service-api.dn-kronas.local/api/web/v1/filial');
    yield put(ServerDataLoaded(branchData.data));
  } catch (err) {
    yield put(ServerDataLoadingError(err));
  }
}

export function* pushData(action) {
  try {
    yield axios.post('http://manufacture-service-api.dn-kronas.local/api/web/v1/filial', {
      method: 'POST',
      header: 'Data from RegionForm',
      name: action.branch.name,
      region: action.branch.region,
      city: action.branch.city,
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
