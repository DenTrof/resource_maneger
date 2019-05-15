/*
 *
 * ProcessPage actions
 *
 */

import {
  DEFAULT_ACTION, SUBMIT_ACTION, NAME_ACTION,
  LOAD_PROCESS_DATA, PROCESS_DATA_ERROR,
} from './constants';

export function submitAction(process) {
  return {
    type: SUBMIT_ACTION,
    process,
  };
}

export function ServerDataLoaded(process) {
  // console.log(equipment);
  return {
    type: LOAD_PROCESS_DATA,
    process,
  };
}

export function ServerDataLoadingError(error) {
  return {
    type: PROCESS_DATA_ERROR,
    error,
  };
}

export function saveTechName(techName) {
  return {
    type: NAME_ACTION,
    techName,
  };
}

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}
