import { put, all, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import { SUBMIT_ACTION } from './constants';
import { ServerDataLoaded, ServerDataLoadingError,
  AreaDataLoaded, OperatDataLoaded } from './actions';


export function* callDataSaga() {
  try {
    const nomenclatureData = yield axios.get('http://manufacture-service-api.dn-kronas.local/api/web/v1/cost-operation');
    // console.log(tehnologyData)
    yield put(ServerDataLoaded(nomenclatureData.data));
  } catch (err) {
    yield put(ServerDataLoadingError(err));
  }
}

export function* callAreaId() {
  try {
    const areaData = yield axios.get('http://manufacture-service-api.dn-kronas.local/api/web/v1/production-area');
    //console.log('postData.data', areaData)
    yield put(AreaDataLoaded(areaData.data));
  } catch (err) {
    yield put(ServerDataLoadingError(err));
  }
}

export function* callOperatId() {
  try {
    const operatData = yield axios.get('http://manufacture-service-api.dn-kronas.local/api/web/v1/technological-operation');
    // console.log('postData.data', operatData.data)
    yield put(OperatDataLoaded(operatData.data));
  } catch (err) {
    yield put(ServerDataLoadingError(err));
  }
}

export function* pushData(action) {
  try {
    yield axios.post('http://manufacture-service-api.dn-kronas.local/api/web/v1/cost-operation', {
      method: 'POST',
      header: 'Data from EquipmentForm',
      production_area_id: +action.operations.production_area_id,
      equipment_id: +action.operations.equipment_id,
      technological_operation_id: +action.operations.technological_operation_id,
      wage: +action.operations.wage,
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
    callAreaId(),
    callOperatId(),

  ]);
}
export default rootSaga;
