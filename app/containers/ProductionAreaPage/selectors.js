import { createSelector } from 'reselect';

const selectProductionDomain = (state) => state.get('production');

const formState = (state) => state.get('form');

const makeSelectProduction = () => createSelector(
  selectProductionDomain,
  (substate) => substate.toJS()
);

const makeValuesProductionForm = () => createSelector(
  formState,
  (homeState) => homeState
);


export default makeSelectProduction;
export {
  makeSelectProduction,
  selectProductionDomain,
  makeValuesProductionForm,
};
