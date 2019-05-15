import { put, all, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import { SUBMIT_ACTION } from './constants';
import { ServerDataLoaded, ServerDataLoadingError, PostDataLoaded } from './actions';

export function* callDataSaga() {
  try {
    const postData = yield axios.get('http://manufacture-service-api.dn-kronas.local/api/web/v1/post');
    yield put(ServerDataLoaded(postData.data));
  } catch (err) {
    yield put(ServerDataLoadingError(err));
  }
}

export function* callPostId() {
  try {
    const postData = yield axios.get('http://manufacture-service-api.dn-kronas.local/api/web/v1/production-area');
    // console.log('postData.data', postData.data)
    yield put(PostDataLoaded(postData.data));
  } catch (err) {
    yield put(ServerDataLoadingError(err));
  }
}

export function* pushData(action) {
  try {
    yield axios.post('http://manufacture-service-api.dn-kronas.local/api/web/v1/post', {
      method: 'POST',
      header: 'Data from PostForm',
      name: action.post.name,
      production_area_id: +action.post.production_area_id,
      // production_area_id: 2,
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
