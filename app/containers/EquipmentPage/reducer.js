/*
 *
 * PositionPage reducer
 *
 */
import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION, SUBMIT_ACTION,
  LOAD_EQUIPMENT_DATA, POST_DATA, IDTD_ACTION,
} from './constants';

const initialState = fromJS({
  equipmentData: [
    {
      id: 1,
      name: 'Тест',
      inventory_number: 83641320,
      performance_per_hour: 100,
      post_id: 9,
      post_id_id: 9,
    },
  ],
  postData: [
    {
      id: 1,
      name: 'Тест зона',
      post: 987656,
    },
    {
      id: 2,
      name: 'Тест зона1',
      post: 9856,
    },
  ],
  equipmentTypes: [
    {
      id: 1,
      name: 'Фрезерный станок',
    },
  ],
  idTdData: '',
});

function positionReducer(state = initialState, action) {
  switch (action.type) {
    case SUBMIT_ACTION:
      return state.set('equipmentData', state.get('equipmentData').concat(action.equipment));
    case LOAD_EQUIPMENT_DATA:
      const equipDataCastom = action.equipment.map((item) => {
        return {
          id: item.id,
          name: item.name,
          inventory_number: item.inventory_number,
          performance_per_hour: item.performance_per_hour,
          post_id: item.post_id[0] ? item.post_id[0].name : null,
          post_id_id: item.post_id[0] ? item.post_id[0].id : null,
        };
      });
      return state.set('equipmentData', equipDataCastom);
    // state.set('equipmentData', action.equipment);
    case POST_DATA:
      return state.set('postData', action.post);
    case IDTD_ACTION:
      return state.set('idTdData', action.idTd);
    case DEFAULT_ACTION:
      return state;
    default:
      return state;
  }
}

export default positionReducer;
