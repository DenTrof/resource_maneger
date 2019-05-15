/*
 *
 * AccountPage actions
 *
 */

import {
  DEFAULT_ACTION, LOAD_OPERATION_DATA, OPERATION_DATA_ERROR,
} from './constants';

export function ServerDataLoaded(employee) {
  return {
    type: LOAD_OPERATION_DATA,
    employee,
  };
}

export function ServerDataLoadingError(error) {
  return {
    type: OPERATION_DATA_ERROR,
    error,
  };
}

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

