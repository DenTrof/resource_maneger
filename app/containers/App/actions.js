/*
 *
 * App actions
 *
 */

import {
  LOGIN_ACTION, LOGIN_SUCCESS, LOGOUT_ACTION,
} from './constants';

export function loginAction(data) {
  return {
    type: LOGIN_ACTION,
    data,

  };
}
export function logoutAction(data) {
  return {
    type: LOGOUT_ACTION,
    data,
  };
}


export function loginSuccessAction(data) {
  return {
    type: LOGIN_SUCCESS,
    data,
  };
}
