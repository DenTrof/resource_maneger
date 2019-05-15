import { put, all, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import { SUBMIT_ACTION } from './constants';
import { ServerDataLoaded, ServerDataLoadingError, GroupDataLoaded } from './actions';


export function* callDataSaga() {
  try {
    const tehnologyData = yield axios.get('http://manufacture-service-api.dn-kronas.local/api/web/v1/technological-operation-order');
    // console.log('tehnologyData.data',tehnologyData.data);
    yield put(ServerDataLoaded(tehnologyData.data));
  } catch (err) {
    yield put(ServerDataLoadingError(err));
  }
}

export function* callGroupId() {
  try {
    const operationData = yield axios.get('http://manufacture-service-api.dn-kronas.local/api/web/v1/technological-operation');
    // console.log('postData.data', operationData.data)
    yield put(GroupDataLoaded(operationData.data));
  } catch (err) {
    yield put(ServerDataLoadingError(err));
  }
}

export function* pushData(action) {
  try {
    yield axios.post('http://manufacture-service-api.dn-kronas.local/api/web/v1/technological-operation-order', {
      method: 'POST',
      header: 'Data from OperationGroupForm',
      order_id: +action.group.equipment_id,
      technological_operation_id: +action.group.technological_operation_id,
      number: +action.group.number,
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

