import { createSelector } from 'reselect';

const selectTehnologyDomain = (state) => state.get('equipmentop');
const formState = (state) => state.get('form');
const selectEquipmentDomain = (state) => state.get('equipment');

const makeSelectTehnology = () => createSelector(
  selectTehnologyDomain,
  (substate) => substate.toJS()
);

const makeSelectEquipment = () => createSelector(
  selectEquipmentDomain,
  (substate) => substate.toJS()
);

const makeValuesTehnologyForm = () => createSelector(
  formState,
  (homeState) => homeState
);

export {
  makeSelectTehnology,
  makeValuesTehnologyForm,
  makeSelectEquipment,
};
