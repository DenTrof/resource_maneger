import { put, all, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
// import { reactLocalStorage } from 'reactjs-localstorage';
import { SUBMIT_ACTION, ID_DATA } from './constants';
import { ServerDataLoaded, ServerDataLoadingError, OperationDataLoaded } from './actions';


// export function* callDataSaga(action) {
//   //console.log('++++++++++++555555', action.id);
//   const id = action.id;
//   try {
//     const tehnologyData = yield axios.get(`http://manufacture-service-api.dn-kronas.local/api/web/v1/equipment-operation/card-equipment-operation?id=${id}`);
//     yield put(ServerDataLoaded(tehnologyData.data));
//   } catch (err) {
//     yield put(ServerDataLoadingError(err));
//   }
// }

export function* callOperationId() {
  try {
    const operationData = yield axios.get('http://manufacture-service-api.dn-kronas.local/api/web/v1/technological-operation');
    // console.log('postData.data', postData.data)
    yield put(OperationDataLoaded(operationData.data));
  } catch (err) {
    yield put(ServerDataLoadingError(err));
  }
}

export function* pushData(action) {
  try {
    yield axios.post('http://manufacture-service-api.dn-kronas.local/api/web/v1/equipment-operation', {
      method: 'POST',
      header: 'Data from EquipmentForm',
      equipment_id: +action.tehnology.equipment_id,
      time: +action.tehnology.time,
      technological_operation_id: +action.tehnology.technological_operation_id,
    });
  } catch (err) {
    yield put(ServerDataLoadingError(err));
  }
}

export function* pushSaga() {
  yield takeEvery(SUBMIT_ACTION, pushData);
}

export function* pushId() {
  yield takeEvery(ID_DATA, pushData);
}

export function* rootSaga() {
  yield all([
    //callDataSaga(),
    pushSaga(),
    pushId(),
    callOperationId(),
  ]);
}
export default rootSaga;
