/*
 *
 * PositionPage reducer
 *
 */
import { fromJS } from 'immutable';
import { DEFAULT_ACTION, SUBMIT_ACTION, LOAD_POSITION_DATA } from './constants';

const initialState = fromJS({

  positionData: [
    {
      id: 1,
      position_name: 'Тест',
    },
  ],
});

function positionReducer(state = initialState, action) {
  switch (action.type) {
    case SUBMIT_ACTION:
      return state.set('positionData', state.get('positionData').concat(action.position));
    case LOAD_POSITION_DATA:
      return state.set('positionData', action.positionDataAll);
    case DEFAULT_ACTION:
      return state;
    default:
      return state;
  }
}

export default positionReducer;
