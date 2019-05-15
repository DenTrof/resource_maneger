
import { put, select, throttle, all } from 'redux-saga/effects';
// import { loginSuccessAction } from 'containers/App/actions';
import { LOGIN_ACTION, LOGOUT_ACTION } from 'containers/App/constants';
// import { reset } from 'redux-form';

// import { api } from 'api';
import Cookie from 'app-cookie';

// import { makeSelectForm } from './selectors';

export default function* appSaga() {
  yield all([
    throttle(500, LOGOUT_ACTION, onLogoutAction),
    throttle(500, LOGIN_ACTION, onLoginAction),
  ]);

//   const data = yield api.get('/login');
//   if (data) {
//     console.log('login');
//     yield put(loginSuccessAction(data.data));
//   } else {
//     console.log('what');
//   }
}


function* onLogoutAction() {
  Cookie.clearSessionId();
}

function* onLoginAction() {
  // const form = yield select(makeSelectForm());
  // const data = yield api.post('/login', { username: form.values.username, password: form.values.password });

  // if (data) {
  //   if (data.data.status === 'success') {
  //     Cookie.setSessionId(data.data.session_id);
  //     yield put(loginSuccessAction(data.data));
  //     yield put(reset('syncValidation'));
  //   }
  // } else {

  // }
}