import { createSelector } from 'reselect';

const selectChangeDomain = (state) => state.get('change');
const formState = (state) => state.get('form');

const makeSelectChange = () => createSelector(
  selectChangeDomain,
  (substate) => substate.toJS()
);

const makeValuesChangeForm = () => createSelector(
  formState,
  (homeState) => homeState
);

export default makeSelectChange;
export {
  makeSelectChange,
  selectChangeDomain,
  makeValuesChangeForm,
};
