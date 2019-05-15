import { createSelector } from 'reselect';

const selectOperationDomain = (state) => state.get('operation');

const formState = (state) => state.get('form');

const makeSelectOperation = () => createSelector(
  selectOperationDomain,
  (substate) => substate.toJS()
);

const makeValuesOperationForm = () => createSelector(
  formState,
  (homeState) => homeState
);

export {
  makeSelectOperation,
  selectOperationDomain,
  makeValuesOperationForm,
};
