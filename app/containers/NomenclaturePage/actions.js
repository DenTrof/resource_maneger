/*
 *
 * NomenclaturePage actions
 *
 */

import {
  DEFAULT_ACTION, SUBMIT_ACTION,
  LOAD_NOMENCLATURE_DATA, NOMENCLATURE_DATA_ERROR,
} from './constants';

export function submitAction(nomenclature) {
  return {
    type: SUBMIT_ACTION,
    nomenclature,
  };
}

export function ServerDataLoaded(nomenclature) {
  return {
    type: LOAD_NOMENCLATURE_DATA,
    nomenclature,
  };
}

export function ServerDataLoadingError(error) {
  return {
    type: NOMENCLATURE_DATA_ERROR,
    error,
  };
}

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}
