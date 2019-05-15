import { createSelector } from 'reselect';

const selectEmployeeDomain = (state) => state.get('employee');
const formState = (state) => state.get('form');


const makeSelectEmployee = () => createSelector(
  selectEmployeeDomain,
  (substate) => substate.toJS()
);
const makeSelectVisitsForm = () => createSelector(
  selectEmployeeDomain,
  (homeState) => homeState.get('accountData').toJS()
);


const makeValuesEmployeeForm = () => createSelector(
  formState,
  (homeState) => homeState
);

export default makeSelectEmployee;
export {
  makeValuesEmployeeForm,
  makeSelectVisitsForm,
};
