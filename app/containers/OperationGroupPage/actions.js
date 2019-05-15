/*
 *
 * OperationGroupPage actions
 *
 */

import {
  DEFAULT_ACTION, SUBMIT_ACTION, LOAD_OPERATION_DATA, OPERATION_DATA_ERROR,
} from './constants';

export function submitAction(operation) {
  return {
    type: SUBMIT_ACTION,
    operation,
  };
}

export function ServerDataLoaded(operation) {
  return {
    type: LOAD_OPERATION_DATA,
    operation,
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
