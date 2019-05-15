import { createSelector } from 'reselect';

const selectBranchDomain = (state) => state.get('branch');

const formState = (state) => state.get('form');

// console.log(selectAccountDomain())
/**
 * Other specific selectors


/**
 * Default selector used by AccountPage
 */

const makeSelectBranch = () => createSelector(
  selectBranchDomain,
  (substate) => substate.toJS()
);

const makeValuesBranchForm = () => createSelector(
  formState,
  (homeState) => homeState
);


export default makeSelectBranch;
export {
  makeSelectBranch,
  selectBranchDomain,
  makeValuesBranchForm,
};
