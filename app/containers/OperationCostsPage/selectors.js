import { createSelector } from 'reselect';

const selectCostsDomain = (state) => state.get('operationCosts');
const formState = (state) => state.get('form');

const makeSelectCosts = () => createSelector(
  selectCostsDomain,
  (substate) => substate.toJS()
);

const makeValuesCostsForm = () => createSelector(
  formState,
  (homeState) => homeState
);

export {
  makeSelectCosts,
  selectCostsDomain,
  makeValuesCostsForm,
};
