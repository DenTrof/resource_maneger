import { createSelector } from 'reselect';

const selectTehnologyDomain = (state) => state.get('tehnology');
const formState = (state) => state.get('form');

const makeSelectTehnology = () => createSelector(
  selectTehnologyDomain,
  (substate) => substate.toJS()
);

const makeValuesTehnologyForm = () => createSelector(
  formState,
  (homeState) => homeState
);

export {
  makeSelectTehnology,
  selectTehnologyDomain,
  makeValuesTehnologyForm,
};
