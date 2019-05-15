/*
 *
 * OperationCostsPage actions
 *
 */

import {
  DEFAULT_ACTION, SUBMIT_ACTION, LOAD_OPERATION_DATA, OPERATION_DATA_ERROR,
  AREA_DATA, OPERAT_DATA,
} from './constants';

export function submitAction(operations) {
  return {
    type: SUBMIT_ACTION,
    operations,
  };
}

export function ServerDataLoaded(operations) {
  return {
    type: LOAD_OPERATION_DATA,
    operations,
  };
} 

export function AreaDataLoaded(area) {
  return {
    type: AREA_DATA,
    area,
  };
}

export function OperatDataLoaded(operat) {
  return {
    type: OPERAT_DATA,
    operat,
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
