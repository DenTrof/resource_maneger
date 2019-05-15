import { createSelector } from 'reselect';

const selectProcessDomain = (state) => state.get('process');

const formState = (state) => state.get('form');

const makeSelectProcess = () => createSelector(
  selectProcessDomain,
  (substate) => substate.toJS()
);

const makeValuesProcessForm = () => createSelector(
  formState,
  (homeState) => homeState
);

export {
  makeSelectProcess,
  selectProcessDomain,
  makeValuesProcessForm,
};
