import { createSelector } from 'reselect';

const selectPostDomain = (state) => state.get('post');

const formState = (state) => state.get('form');

const makeSelectPost = () => createSelector(
  selectPostDomain,
  (substate) => substate.toJS()
);

const makeValuesPostForm = () => createSelector(
  formState,
  (homeState) => homeState
);


// export default makeSelectEquipment;
export {
  makeSelectPost,
  selectPostDomain,
  makeValuesPostForm,
};
