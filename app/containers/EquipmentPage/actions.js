/*
 *
 * EquipmentPage actions
 *
 */

import {
  DEFAULT_ACTION, SUBMIT_ACTION, IDTD_ACTION,
  LOAD_EQUIPMENT_DATA, EQUIPMENT_DATA_ERROR, NAME_ACTION, POST_DATA,
} from './constants';

export function submitAction(equipment) {
  return {
    type: SUBMIT_ACTION,
    equipment,
  };
}

export function ServerDataLoaded(equipment) {
  // console.log(equipment);
  return {
    type: LOAD_EQUIPMENT_DATA,
    equipment,
  };
}

export function PostDataLoaded(post) { 
  return {
    type: POST_DATA,
    post,
  };
}

export function ServerDataLoadingError(error) {
  return {
    type: EQUIPMENT_DATA_ERROR,
    error,
  };
}

export function saveEquiName(id) {
  return {
    type: NAME_ACTION,
    id,
  };
}

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}
