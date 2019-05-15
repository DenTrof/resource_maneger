import { createSelector } from 'reselect';
// import makeSelectHomePageSchedule from '../HomePageSchedule/selectors';


const selectApp = (state) => state.get('app');

const makeSelectApp = () => createSelector(
  selectApp,
  (substate) => substate.toJS()
);


const selectForm = (state) => state.get('form');

const makeSelectForm = () => createSelector(
  selectForm,
  (substate) => substate.syncValidation
);


// export default makeSelectApp;
export {
  makeSelectApp,
  makeSelectForm,
};

