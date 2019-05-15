import { createSelector } from 'reselect';

const selectEmployeesDomain = (state) => state.get('employees');

const formState = (state) => state.get('form');


const makeSelectEmployees = () => createSelector(
  selectEmployeesDomain,
  (substate) => substate.toJS()
);

const makeValuesEmployeesForm = () => createSelector(
  formState,
  (homeState) => homeState
);


export default makeSelectEmployees;
export {
  makeSelectEmployees,
  selectEmployeesDomain,
  makeValuesEmployeesForm,
};
