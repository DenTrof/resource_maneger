import { createSelector } from 'reselect';

const selectAccountDomain = (state) => state.get('position');

const formState = (state) => state.get('form');

const makeSelectAccount = () => createSelector(
  selectAccountDomain,
  (substate) => substate.toJS()
);

const makeSelectVisitsForm = () => createSelector(
  selectAccountDomain,
  (homeState) => homeState.get('sponsorData').toJS()
);
const makeValuesPositionForm = () => createSelector(
  formState,
  (homeState) => homeState
);


export default makeSelectAccount;
export {
  makeSelectAccount,
  selectAccountDomain,
  makeSelectVisitsForm,
  makeValuesPositionForm,
};
