/*
 *
 * NomenclaturePage reducer
 *
 */
import { fromJS } from 'immutable';
import { DEFAULT_ACTION, SUBMIT_ACTION, LOAD_NOMENCLATURE_DATA } from './constants';

const initialState = fromJS({
  nomenclatureData: [
    {
      id: 1,
      name: 'Тест',
      articul: 'Тест',
      link: 'http://localhost:3055/test',
    },
  ],
  nomenclatureTypes: [
    {
      id: 1,
      name: 'Маяковского',
    },
    {
      id: 2,
      name: 'Маяковского',
    },
    {
      id: 3,
      name: 'Маяковского',
    },
    {
      id: 4,
      name: 'Маяковского',
    },
  ],

});

function positionReducer(state = initialState, action) {
  switch (action.type) {
    case SUBMIT_ACTION:
      return state.set('nomenclatureData', state.get('nomenclatureData').concat(action.nomenclature));
    case LOAD_NOMENCLATURE_DATA:
      return state.set('nomenclatureData', action.nomenclature);
    case DEFAULT_ACTION:
      return state;
    default:
      return state;
  }
}

export default positionReducer;
