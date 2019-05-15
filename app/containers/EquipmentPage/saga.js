import { put, all, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import { SUBMIT_ACTION } from './constants';
import { ServerDataLoaded, ServerDataLoadingError, PostDataLoaded } from './actions';


export function* callDataSaga() {
  try {
    const equipmentData = yield axios.get('http://manufacture-service-api.dn-kronas.local/api/web/v1/equipment');
    // console.log(equipmentData);
    yield put(ServerDataLoaded(equipmentData.data));
  } catch (err) {
    yield put(ServerDataLoadingError(err));
  }
}

export function* callPostId() {
  try {
    const postData = yield axios.get('http://manufacture-service-api.dn-kronas.local/api/web/v1/post');
    // console.log('postData.data', postData.data)
    yield put(PostDataLoaded(postData.data));
  } catch (err) {
    yield put(ServerDataLoadingError(err));
  }
}

export function* pushData(action) {
  try {
    yield axios.post('http://manufacture-service-api.dn-kronas.local/api/web/v1/equipment', {
      method: 'POST',
      header: 'Data from EquipmentForm',
      name: action.equipment.name,
      inventory_number: +action.equipment.inventory_number,
      performance_per_hour: +action.equipment.performance_per_hour,
      post_id: +action.equipment.post_id,
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
    callPostId(),
  ]);
}
export default rootSaga;
