import { createSelector } from 'reselect';

const selectEquipmentDomain = (state) => state.get('equipment');

const formState = (state) => state.get('form');

// console.log(selectAccountDomain())
/**
 * Other specific selectors


/**
 * Default selector used by AccountPage
 */

const makeSelectEquipment = () => createSelector(
  selectEquipmentDomain,
  (substate) => substate.toJS()
);

const makeValuesEquipmentForm = () => createSelector(
  formState,
  (homeState) => homeState
);


export default makeSelectEquipment;
export {
  makeSelectEquipment,
  selectEquipmentDomain,
  makeValuesEquipmentForm,
};
