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

export function* callAreaId() {
  try {
    const areaData = yield axios.get('http://manufacture-service-api.dn-kronas.local/api/web/v1/production-area');
    //console.log('postData.data', areaData)
    yield put(AreaDataLoaded(areaData.data));
  } catch (err) {
    yield put(ServerDataLoadingError(err));
  }
}

export function* callPositionId() {
  try {
    const positionData = yield axios.get('http://manufacture-service-api.dn-kronas.local/api/web/v1/positions');
    // console.log('postData.data', positionData.data)
    yield put(PositionDataLoaded(positionData.data));
  } catch (err) {
    yield put(ServerDataLoadingError(err));
  }
}

export function* pushData(action) {
  try {
    yield axios.post('http://manufacture-service-api.dn-kronas.local/api/web/v1/employees', {
      method: 'POST',
      header: 'Data from OperationForm',
      first_name: action.employees.first_name,
      last_name: action.employees.last_name,
      patronymic: action.employees.patronymic,
      position_id: action.employees.position_id,
      production_area_id: action.employees.production_area_id,
      // photo: 'http://www.membermind.pro/wp-content/uploads/2015/08/spikl.png',
      photo: action.employees.photo,
      login: action.employees.login,
      password: action.employees.password,
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
    callPositionId(),

  ]);
}
export default rootSaga;
