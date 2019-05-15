import { put, all } from 'redux-saga/effects';
import axios from 'axios';
import {
  ServerDataLoaded, ServerDataLoadingError, AreaDataLoaded,
} from './actions';

// export function* callDataSaga() {
//   try {
//     const changeData = yield axios.get('http://manufacture-service-api.dn-kronas.local/api/web/v1/api/shift-time', {
//       method: 'GET',
//       header: 'Data from ShistForm',
//       id: 2,
//     });
//     console.log('888888postData.data', changeData);
//     yield put(ServerDataLoaded(changeData.data));
//   } catch (err) {
//     yield put(ServerDataLoadingError(err));
//   }
// }

export function* callAreaId() {
  try {
    const areaData = yield axios.get('http://manufacture-service-api.dn-kronas.local/api/web/v1/production-area');
    yield put(AreaDataLoaded(areaData.data));
  } catch (err) {
    yield put(ServerDataLoadingError(err));
  }
}

export function* rootSaga() {
  yield all([
    // callDataSaga(),
    callAreaId(),
  ]);
}
export default rootSaga;

