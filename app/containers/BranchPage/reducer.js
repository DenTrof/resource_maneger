/*
 *
 * PositionPage reducer
 *
 */
import { fromJS } from 'immutable';
import { DEFAULT_ACTION, SUBMIT_ACTION, LOAD_FILIAL_DATA } from './constants';

const initialState = fromJS({
  branchData: [
    {
      id: 1,
      name: 'Тест',
      region: 'Тест',
      city: 'Тест',
    },
  ],
  cityBranch: [
    {
      id: 1,
      name: 'Одесса',
    },
    {
      id: 2,
      name: 'Киев',
    },
    {
      id: 3,
      name: 'Харьков',
    },
    {
      id: 4,
      name: 'Донецк',
    },
  ],
  areaBranch: [
    {
      id: 1,
      name: 'Одесская',
    },
    {
      id: 2,
      name: 'Киевская',
    },
    {
      id: 3,
      name: 'Харьковская',
    },
    {
      id: 4,
      name: 'Донецкая',
    },
  ],

});

function branchReducer(state = initialState, action) {
  switch (action.type) {
    case SUBMIT_ACTION:
      return state.set('branchData', state.get('branchData').concat(action.branch));
    case LOAD_FILIAL_DATA:
      return state.set('branchData', action.branch);
    case DEFAULT_ACTION:
      return state;
    default:
      return state;
  }
}

export default branchReducer;
