/*
 *
 * ManufacturePage actions
 *
 */

import {
  DEFAULT_ACTION, CHANGE_DATE_RANGE,
} from './constants';

export function changeDateRange(dateRange) {
  // console.log('dateRange', dateRange)
  return {
    type: CHANGE_DATE_RANGE,
    dateRange,
  };
}
export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}
