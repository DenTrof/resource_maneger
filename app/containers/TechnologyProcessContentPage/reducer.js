/*
 *
 * TehnologyPage reducer
 *
 */
import { fromJS } from 'immutable';
import { DEFAULT_ACTION, SUBMIT_ACTION, GROUPE_DATA,
  LOAD_GROUP_OPER_DATA } from './constants';

const initialState = fromJS({
  tehnologyData: [
    {
      id: 1,
      order_id: 5,
      technological_operation_id: 3,
      number: 7,
    },
  ],
  groupData: [
    {
      id: 1,
      name: 'Распилка',
    },
    {
      id: 2,
      name: 'Фрезеровка',
    },
  ],
  technologyTypes: [
    {
      id: 1,
      name: 'Маяковского',
    },
  ],

});

function positionReducer(state = initialState, action) {
  switch (action.type) {
    case SUBMIT_ACTION:
      return state.set('tehnologyData', state.get('tehnologyData').concat(action.tehnology));
    case LOAD_GROUP_OPER_DATA:
      const dataCastom = action.operGroup.map((item) => {
        return {
          id: item.id,
          order_id: item.order_id[0] ? item.order_id[0].order_number : null,
          technological_operation_id: item.technological_operation_id[0] ? item.technological_operation_id[0].name : null,
          technological_operation_id_id: item.technological_operation_id[0] ? item.technological_operation_id[0].id : null,
          number: item.number,
        };
      });
      return state.set('tehnologyData', dataCastom);

    case GROUPE_DATA:
      return state.set('groupData', action.group);
    case DEFAULT_ACTION:
      return state;
    default:
      return state;
  }
}

export default positionReducer;
