/*
 *
 * TehnologyPage reducer
 *
 */
import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION, SUBMIT_ACTION, LOAD_EQUIPMENT_OPER_DATA,
  OPERATION_DATA, ID_DATA,
} from './constants';

const initialState = fromJS({

  tehnologyData: [
    {
      id: 1,
      equipment_id: 290,
      time: 120,
      name: 'Тест',
    },
  ],
  idEqu: '',
  operationData: [
    {
      id: 1,
      name: 'Тест',
      group_operation_id: 5555,
      unit: 'Тест',
    }
  ],
  tehnologyTypes: [
    {
      id: 1,
      name: 'Маяковского',
    },
  ],

});

function equipmentOrReducer(state = initialState, action) {
  switch (action.type) {
    case SUBMIT_ACTION:
      return state.set('tehnologyData', state.get('tehnologyData').concat(action.tehnology));
    case LOAD_EQUIPMENT_OPER_DATA:
      // const dataCastom = action.equipment.map((item) => {
      //   return {
      //     id: item.id,
      //     time: item.time,
      //     name: item.name,
      //     // technological_operation_id: item.technological_operation_id[0] ? item.technological_operation_id[0].name : null,
      //     // technological_operation_id_id: item.technological_operation_id[0] ? item.technological_operation_id[0].id : null,
      //   };
      // });
      return state.set('tehnologyData', action.equipment);
    case OPERATION_DATA:
      return state.set('operationData', action.operation);
    case ID_DATA:
      return state.set('idEqu', action.id);
    case DEFAULT_ACTION:
      return state;
    default:
      return state;
  }
}

export default equipmentOrReducer;
