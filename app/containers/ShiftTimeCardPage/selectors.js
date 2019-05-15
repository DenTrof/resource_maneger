import { createSelector } from 'reselect';

const selectChangeDomain = (state) => state.get('shift');
const formState = (state) => state.get('form');

const makeValuesShiftForm = () => createSelector(
  formState,
  (homeState) => homeState
);

const makeSelectShift = () => createSelector(
  selectChangeDomain,
  (substate) => substate.toJS()
);

export default makeSelectShift;
export {
  makeSelectShift,
  makeValuesShiftForm,
};
