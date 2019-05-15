/*
 *
 * TehnologyPage reducer
 *
 */
import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION, SUBMIT_ACTION,
  LOAD_TECHNOLOGY_DATA, GROUP_DATA,
} from './constants';

const initialState = fromJS({
  teсhnologyData: [
    {
      id: 1,
      name: 'Тест',
      group_operation_id: 5555,
      unit: 'Тест',
    },
  ],
  groupData: [
    {
      id: 1,
      name: 'Группа 1',
    },
    {
      id: 2,
      name: 'Группа 2',
    },
  ],
  technologyTypes: [
    {
      id: 1,
      name: 'Маяковского',
    },
    {
      id: 2,
      name: 'Маяковского',
    },
  ],

});

function positionReducer(state = initialState, action) {
  switch (action.type) {
    case SUBMIT_ACTION:
      return state.set('teсhnologyData', state.get('teсhnologyData').concat(action.teсhnology));
    case LOAD_TECHNOLOGY_DATA:
      const dataCastom = action.teсhnologys.map((item) => {
        return {
          id: item.id,
          name: item.name,
          group_operation_id: item.group_operation_id[0] ? item.group_operation_id[0].name : null,
          unit: item.unit,
          group_operation_id_id: item.group_operation_id[0] ? item.group_operation_id[0].id : null,
        };
      });
      return state.set('teсhnologyData', dataCastom);
    case GROUP_DATA:
      return state.set('groupData', action.group);
    case DEFAULT_ACTION:
      return state;
    default:
      return state;
  }
}

export default positionReducer;
