/*
 *
 * AccountPage actions
 *
 */

import {
  DEFAULT_ACTION, SUBMIT_ACTION,
  LOAD_PRODUCTION_DATA, PRODUCTION_DATA_ERROR, PRODUCT_DATA,
} from './constants';

export function submitAction(production) {
  return {
    type: SUBMIT_ACTION,
    production,
  };
}

export function ServerDataLoaded(productions) {
  return {
    type: LOAD_PRODUCTION_DATA,
    productions,
  };
}

export function ServerDataLoadingError(error) {
  return {
    type: PRODUCTION_DATA_ERROR,
    error,
  };
}

export function FilialDataLoaded(filial) {
  return {
    type: PRODUCT_DATA,
    filial,
  };
}

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}
