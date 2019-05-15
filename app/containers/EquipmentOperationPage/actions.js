/*
 *
 * EquipmentOperationPage actions
 *
 */

import {
  DEFAULT_ACTION, SUBMIT_ACTION, IDTD_ACTION,
  LOAD_EQUIPMENT_OPER_DATA, EQUIPMENT_OPER_DATA_ERROR,
  OPERATION_DATA, ID_DATA,
} from './constants';

export function submitAction(tehnology) {
  return {
    type: SUBMIT_ACTION,
    tehnology,
  };
}

export function idTdAction(idTd) {
  return {
    type: IDTD_ACTION,
    idTd,
  };
}

export function OperationDataLoaded(operation) {
  return {
    type: OPERATION_DATA,
    operation,
  };
}

export function ServerDataLoaded(equipment) {
  return {
    type: LOAD_EQUIPMENT_OPER_DATA,
    equipment,
  };
}

export function IdLoaded(id) {
  return {
    type: ID_DATA,
    id,
  };
}

export function ServerDataLoadingError(error) {
  return {
    type: EQUIPMENT_OPER_DATA_ERROR,
    error,
  };
}

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}
