/*
 *
 * OperationPage reducer
 *
 */
import { fromJS } from 'immutable';
import { DEFAULT_ACTION, SUBMIT_ACTION, LOAD_OPERATION_DATA } from './constants';

const initialState = fromJS({
  operationData: [
    {
      id: 1,
      name: 'Test Test Test',
    },
  ],
  operationTypes: [
    {
      id: 1,
      name: 'Сборщик Корпусной Мебели',
    },
    {
      id: 2,
      name: 'Разнорабочий/столярный цех',
    },

    {
      id: 3,
      name: 'Распиловщик',
    },
    {
      id: 4,
      name: 'Мастер производства',
    },
  ],

});

function positionReducer(state = initialState, action) {
  switch (action.type) {
    case SUBMIT_ACTION:
      return state.set('operationData', state.get('operationData').concat(action.operation));
    case LOAD_OPERATION_DATA:
      return state.set('operationData', action.operation);
    case DEFAULT_ACTION:
      return state;
    default:
      return state;
  }
}

export default positionReducer;
