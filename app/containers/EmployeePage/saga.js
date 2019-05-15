import { put, all, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import { SUBMIT_ACTION } from './constants';
import { ServerDataLoaded, ServerDataLoadingError,
  AreaDataLoaded, PositionDataLoaded } from './actions';


export function* callDataSaga() {
  try {
    const operationData = yield axios.get('http://manufacture-service-api.dn-kronas.local/api/web/v1/employees');
    // console.log(operationData.data)
    yield put(ServerDataLoaded(operationData.data));
  } catch (err) {
    yield put(ServerDataLoadingError(err));
  }
}
export function* rootSaga() {
  yield all([
    callDataSaga(),
  ]);
}
export default rootSaga;
