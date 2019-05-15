/*
 *
 * SponsorsPage actions
 *
 */


import {
  DEFAULT_ACTION, SUBMIT_ACTION,
} from './constants';

export function submitAction(storage) {
  return {
    type: SUBMIT_ACTION,
    storage,
  };
}
export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

