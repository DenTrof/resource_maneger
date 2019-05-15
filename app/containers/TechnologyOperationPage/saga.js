import { put, all, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import { SUBMIT_ACTION } from './constants';
import { ServerDataLoaded, ServerDataLoadingError, GroupDataLoaded } from './actions';

export function* callDataSaga() {
  try {
    const technologicalData = yield axios.get('http://manufacture-service-api.dn-kronas.local/api/web/v1/technological-operation');
    yield put(ServerDataLoaded(technologicalData.data));
  } catch (err) {
    yield put(ServerDataLoadingError(err));
  }
}

export function* callGroupId() {
  try {
    const postData = yield axios.get('http://manufacture-service-api.dn-kronas.local/api/web/v1/group-operations');

    yield put(GroupDataLoaded(postData.data));
  } catch (err) {
    yield put(ServerDataLoadingError(err));
  }
}

export function* pushData(action) {
  try {
    yield axios.post('http://manufacture-service-api.dn-kronas.local/api/web/v1/technological-operation', {
      method: 'POST',
      header: 'Data from PostForm',
      name: action.teсhnology.name,
      group_operation_id: +action.teсhnology.group_operation_id,
      unit: action.teсhnology.unit,
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
    callGroupId(),
  ]);
}
export default rootSaga;
