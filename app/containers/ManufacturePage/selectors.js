import { createSelector } from 'reselect';

/**
 * Direct selector to the manufacturePage state domain
 */
const selectManufacturePageDomain = (state) => state.get('manufacturePage');


const makeSelectManufacturePage = () => createSelector(
  selectManufacturePageDomain,
  (substate) => substate.toJS()
);

const makeFiltratedData = () => createSelector(
  selectManufacturePageDomain,
  (substate) => substate.get('manufactureData').toJS().filter((date) => {
    const published = Date.parse(date.date);
    return (!substate.get('dateRange').from || !substate.get('dateRange').to
        || ((published > Date.parse(substate.get('dateRange').from)) && published < Date.parse(substate.get('dateRange').to)));
  }));

export {
  makeSelectManufacturePage,
  makeFiltratedData,
};
