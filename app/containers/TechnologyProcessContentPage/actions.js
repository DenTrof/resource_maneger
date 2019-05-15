/*
 *
 * AccountPage actions
 *
 */

import {
  DEFAULT_ACTION, SUBMIT_ACTION, GROUPE_DATA,
  LOAD_GROUP_OPER_DATA, GROUP_OPER_DATA_ERROR,
} from './constants';

export function submitAction(tehnology) {
  return {
    type: SUBMIT_ACTION,
    tehnology,
  };
}

export function ServerDataLoaded(operGroup) {
  return {
    type: LOAD_GROUP_OPER_DATA,
    operGroup,
  };
}

export function ServerDataLoadingError(error) {
  return {
    type: GROUP_OPER_DATA_ERROR,
    error,
  };
}

export function GroupDataLoaded(group) {
  return {
    type: GROUPE_DATA,
    group,
  };
}

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}
