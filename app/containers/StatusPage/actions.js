/*
 *
 * AccountPage actions
 *
 */

import {
  DEFAULT_ACTION, SUBMIT_ACTION, LOAD_STATUS_DATA, STATUS_DATA_ERROR,
} from './constants';

export function submitAction(status) {
  return {
    type: SUBMIT_ACTION,
    status,
  };
}

export function ServerDataLoaded(stat) {
  return {
    type: LOAD_STATUS_DATA,
    stat,
  };
}

export function ServerDataLoadingError(error) {
  return {
    type: STATUS_DATA_ERROR,
    error,
  };
}

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}
