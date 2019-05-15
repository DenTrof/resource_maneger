/*
 *
 * EmployeesPage actions
 *
 */

import {
  DEFAULT_ACTION, SUBMIT_ACTION, AREA_DATA, LOAD_OPERATION_DATA,
  POSITION_DATA, OPERATION_DATA_ERROR,
} from './constants';

export function submitAction(employees) {
  return {
    type: SUBMIT_ACTION,
    employees,
  };
}

export function ServerDataLoaded(employee) {
  return {
    type: LOAD_OPERATION_DATA,
    employee,
  };
} 

export function AreaDataLoaded(area) {
  return {
    type: AREA_DATA,
    area,
  };
}

export function PositionDataLoaded(position) {
  return {
    type: POSITION_DATA,
    position,
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
