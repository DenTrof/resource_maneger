import { createSelector } from 'reselect';

/**
 * Direct selector to the accounts state domain
 */
const selectAccountsDomain = (state) => state.get('storegePage');
const formState = (state) => state.get('form');

const makeValuesStoregeForm = () => createSelector(
  formState,
  (homeState) => homeState
);

const makeSelectingFormData = () => createSelector(
  selectAccountsDomain,
  (substate) => substate.get('storageData').toJS()
);


// export default {  };
export {
  makeSelectingFormData,
  makeValuesStoregeForm,
};
