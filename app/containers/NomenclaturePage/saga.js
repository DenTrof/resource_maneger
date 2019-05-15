import { put, all, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import { SUBMIT_ACTION } from './constants';
import { ServerDataLoaded, ServerDataLoadingError } from './actions';


export function* callDataSaga() {
  try {
    const nomenclatureData = yield axios.get('http://manufacture-service-api.dn-kronas.local/api/web/v1/nomenclature');
    // console.log(tehnologyData)
    yield put(ServerDataLoaded(nomenclatureData.data));
  } catch (err) {
    yield put(ServerDataLoadingError(err));
  }
}

export function* pushData(action) {
  try {
    yield axios.post('http://manufacture-service-api.dn-kronas.local/api/web/v1/nomenclature', {
      method: 'POST',
      header: 'Data from EquipmentForm',
      name: action.nomenclature.name,
      articul: action.nomenclature.articul,
      link: action.nomenclature.link,
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
