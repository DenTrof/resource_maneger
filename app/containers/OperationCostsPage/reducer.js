/*
 *
 * TehnologyPage reducer
 *
 */
import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION, SUBMIT_ACTION, LOAD_OPERATION_DATA,
  AREA_DATA, OPERAT_DATA,
} from './constants';

const initialState = fromJS({
  operationsData: [
    {
      id: 1,
      production_area_id: 'Куреневский',
      equipment_id: 'Одесский',
      technological_operation_id: 'Одесса',
      wage: '234',
    },

  ],
  areaData: [
    {
      id: 1,
      name: 'Распиловочная зона',
      filial_id: 1,
    },
  ],
  operatData: [
    {
      id: 1,
      name: 'Распилка',
      group_operation_id: 5555,
      unit: 'Тест',
    },
  ],
  operationsTypes: [
    {
      id: 1,
      name: 'Маяковского',
    },
  ],

});

function operationsReducer(state = initialState, action) {
  switch (action.type) {
    case SUBMIT_ACTION:
      return state.set('operationsData', state.get('operationsData').concat(action.operations));
    case LOAD_OPERATION_DATA:
      const operatDataCastom = action.operations.map((item) => {
        return {
          id: item.id,
          production_area_id: item.production_area_id[0] ? item.production_area_id[0].name : null,
          production_area_id_id: item.production_area_id[0] ? item.production_area_id[0].id : null,
          equipment_id: item.equipment_id,
          technological_operation_id: item.technological_operation_id[0] ? item.technological_operation_id[0].name : null,
          technological_operation_id_id: item.technological_operation_id[0] ? item.technological_operation_id[0].id : null,
          wage: item.wage,
        };
      });
      return state.set('operationsData', operatDataCastom);
    case AREA_DATA:
      return state.set('areaData', action.area);
    case OPERAT_DATA:
      return state.set('operatData', action.operat);
    case DEFAULT_ACTION:
      return state;
    default:
      return state;
  }
}

export default operationsReducer;
