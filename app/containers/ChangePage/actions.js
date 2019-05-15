/*
 *
 * AccountPage actions
 *
 */

import {
  DEFAULT_ACTION, SUBMIT_ACTION, LOAD_CHANGE_DATA,
  CHANGE_DATA_ERROR, POST_DATA, AREA_DATA,
} from './constants';

export function submitAction(change) {
  return {
    type: SUBMIT_ACTION,
    change,
  };
}

export function ServerDataLoaded(changes) {
  return {
    type: LOAD_CHANGE_DATA,
    changes,
  };
}

export function PostDataLoaded(post) { 
  return {
    type: POST_DATA,
    post,
  };
}

export function AreaDataLoaded(area) {
  return {
    type: AREA_DATA,
    area,
  };
}

export function ServerDataLoadingError(error) {
  return {
    type: CHANGE_DATA_ERROR,
    error,
  };
}

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}
