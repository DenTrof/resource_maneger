/*
 *
 * PositionPage actions
 *
 */

import {
  DEFAULT_ACTION, SUBMIT_ACTION,
  LOAD_POSITION_DATA, POSITION_DATA_ERROR,
} from './constants';

export function submitAction(position) {
  return {
    type: SUBMIT_ACTION,
    position,
  };
}

export function ServerDataLoaded(positionDataAll) {
  return {
    type: LOAD_POSITION_DATA,
    positionDataAll,
  };
}

export function ServerDataLoadingError(error) {
  return {
    type: POSITION_DATA_ERROR,
    error,
  };
}

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}
