/*
 *
 * PositionPage reducer
 *
 */
import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION, SUBMIT_ACTION,
  NAME_ACTION, LOAD_PROCESS_DATA,
} from './constants';

const initialState = fromJS({
  processData: [
    {
      id: 1,
      name: 'Порезка',
    },
  ],
  tehnologyDataCastom: {
    name: 'Порезка',
  },
  processTypes: [
    {
      id: 1,
      name: 'Сборщик Корпусной Мебели',
    },
  ],

});

function positionReducer(state = initialState, action) {
  switch (action.type) {
    case SUBMIT_ACTION:
      return state.set('processData', state.get('processData').concat(action.process));
    case LOAD_PROCESS_DATA:
      return state.set('processData', action.process);
    case NAME_ACTION:
      return state.set('tehnologyDataCastom', action.techName);
    case DEFAULT_ACTION:
      return state;
    default:
      return state;
  }
}

export default positionReducer;
