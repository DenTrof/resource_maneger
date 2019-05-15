/*
 *
 * TechologyPage actions
 *
 */

import {
  DEFAULT_ACTION, SUBMIT_ACTION,
  LOAD_TECHNOLOGY_DATA, TECHNOLOGY_DATA_ERROR, GROUP_DATA,
} from './constants';

export function submitAction(teсhnology) {
  return {
    type: SUBMIT_ACTION,
    teсhnology,
  };
}

export function ServerDataLoaded(teсhnologys) {
  return {
    type: LOAD_TECHNOLOGY_DATA,
    teсhnologys,
  };
}

export function ServerDataLoadingError(error) {
  return {
    type: TECHNOLOGY_DATA_ERROR,
    error,
  };
}

export function GroupDataLoaded(group) {
  return {
    type: GROUP_DATA,
    group,
  };
}

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}
