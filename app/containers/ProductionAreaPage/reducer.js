/*
 *
 * PositionPage reducer
 *
 */
import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION, SUBMIT_ACTION,
  LOAD_PRODUCTION_DATA, PRODUCT_DATA,
} from './constants';

const initialState = fromJS({
  productionData: [
    {
      id: 1,
      name: 'Сборщик Корпусной Мебели',
      filial_id: 1,
    },
  ],
  filialData: [
    {
      id: 1,
      name: 'Фрезеровочная зона',
      filial_id: 10,
    },
    {
      id: 2,
      name: 'Распиловочная зона',
      filial_id: 12,
    },

  ],
});

function positionReducer(state = initialState, action) {
  switch (action.type) {
    case SUBMIT_ACTION:
      return state.set('productionData', state.get('productionData').concat(action.production));
    case LOAD_PRODUCTION_DATA:
      const filialDataCastom = action.productions.map((item) => {
        return {
          id: item.id,
          name: item.name,
          filial_id: item.filial_id[0] ? item.filial_id[0].name : null,
          filial_id_id: item.filial_id[0] ? item.filial_id[0].id : null,
        };
      });
      return state.set('productionData', filialDataCastom);
    case PRODUCT_DATA:
      return state.set('filialData', action.filial);
    case DEFAULT_ACTION:
      return state;
    default:
      return state;
  }
}

export default positionReducer;
