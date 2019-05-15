import { createSelector } from 'reselect';

const selectNomenclatureDomain = (state) => state.get('nomenclature');
const formState = (state) => state.get('form');

const makeSelectNomenclature = () => createSelector(
  selectNomenclatureDomain,
  (substate) => substate.toJS()
);

const makeValuesNomenclatureForm = () => createSelector(
  formState,
  (homeState) => homeState
);

export {
  makeSelectNomenclature,
  selectNomenclatureDomain,
  makeValuesNomenclatureForm,
};
