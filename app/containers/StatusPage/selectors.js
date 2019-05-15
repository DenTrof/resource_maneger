import { createSelector } from 'reselect';

const selectStatusDomain = (state) => state.get('status');

const formState = (state) => state.get('form');

const makeSelectStatus = () => createSelector(
  selectStatusDomain,
  (substate) => substate.toJS()
);

const makeValuesStatusForm = () => createSelector(
  formState,
  (homeState) => homeState
);

export {
  makeSelectStatus,
  makeValuesStatusForm,
};
