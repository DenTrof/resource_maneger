/*
 *
 * PositionPage reducer
 *
 */
import { fromJS } from 'immutable';
import { DEFAULT_ACTION, SUBMIT_ACTION, LOAD_STATUS_DATA } from './constants';

const initialState = fromJS({
  statusData: [
    {
      id: 1,
      name: 'Сборка',
      description: 'Ожидает комплектации',
    },
  ],
  statusTypes: [
    {
      id: 1,
      name: 'Сборщик Корпусной Мебели',
    },
  ],

});

function statusReducer(state = initialState, action) {
  switch (action.type) {
    case SUBMIT_ACTION:
      return state.set('statusData', state.get('statusData').concat(action.status));
    case LOAD_STATUS_DATA:
      return state.set('statusData', action.stat);
    case DEFAULT_ACTION:
      return state;
    default:
      return state;
  }
}

export default statusReducer;
