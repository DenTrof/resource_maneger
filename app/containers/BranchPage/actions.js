/*
 *
 * AccountPage actions
 *
 */

import {
  DEFAULT_ACTION, SUBMIT_ACTION,
  LOAD_FILIAL_DATA, FILIAL_DATA_ERROR,
} from './constants';

export function submitAction(branch) {
  return {
    type: SUBMIT_ACTION,
    branch,
  };
}

export function ServerDataLoaded(branch) {
  return {
    type: LOAD_FILIAL_DATA,
    branch,
  };
}

export function ServerDataLoadingError(error) {
  return {
    type: FILIAL_DATA_ERROR,
    error,
  };
}
export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}
