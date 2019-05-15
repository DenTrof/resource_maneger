import { put, all, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import { SUBMIT_ACTION } from './constants';
import { ServerDataLoaded, ServerDataLoadingError,
  PostDataLoaded, AreaDataLoaded } from './actions';


export function* callDataSaga() {
  try {
    const changeData = yield axios.get('http://manufacture-service-api.dn-kronas.local/api/web/v1/work-shift');
    yield put(ServerDataLoaded(changeData.data));
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

export function* callAreaId() {
  try {
    const areaData = yield axios.get('http://manufacture-service-api.dn-kronas.local/api/web/v1/production-area');
    //console.log('postData.data', areaData)
    yield put(AreaDataLoaded(areaData.data));
  } catch (err) {
    yield put(ServerDataLoadingError(err));
  }
}

export function* pushData(action) {
  try {
    yield axios.post('http://manufacture-service-api.dn-kronas.local/api/web/v1/work-shift', {
      method: 'POST',
      header: 'Data from ChangeForm',
      date: action.change.date,
      start_shift: action.change.start_shift,
      shift_end: action.change.shift_end,
      shift_number: +action.change.shift_number,
      production_area_id: +action.change.production_area_id,
      post_id: +action.change.post_id,
      name: action.change.name,
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
    callAreaId(),
  ]);
}
export default rootSaga;

