/*
 *
 * PositionPage reducer
 *
 */
import { fromJS } from 'immutable';
import { DEFAULT_ACTION, SUBMIT_ACTION, LOAD_CHANGE_DATA,
   AREA_DATA } from './constants';

const initialState = fromJS({
  shiftData: [
    {
      id: 1,
      free_time: 42000,
      busy_time: 1200,
      date: '2019-02-22',
      start_shift: '2019-02-22 08:00',
      shift_end: '2019-02-22 20:00',
      shift_number: 1,
      post_id: 19,
      post_name: 'Пост 19',
    },
  ],
  postData: [
    {
      id: 1,
      name: 'Распиловочная зона',
      post: 987656,
    },
    {
      id: 2,
      name: 'Фрезерная зона',
      post: 9856,
    },
  ],
  areaData: [
    {
      id: 1,
      name: 'Распиловочная зона',
      filial_id: 1,
    },
  ],
});

function ShiftReducer(state = initialState, action) {
  switch (action.type) {
    case SUBMIT_ACTION:
      return state.set('shiftData', state.get('shiftData').concat(action.change));
    // case LOAD_CHANGE_DATA:
    //   const dataCastom = action.changes.map((item) => ({
    //     id: item.id,
    //     free_time: item.free_time,
    //     busy_time: item.busy_time,
    //     date: item.date,
    //     start_shift: item.start_shift,
    //     shift_end: item.shift_end,
    //     shift_number: item.shift_number,
    //     post_id: item.post_id[0] ? item.post_id[0].id : null,
    //     post_name: item.post_id[0] ? item.post_id[0].name : null,
    //   }));
    //   return state.set('shiftData', dataCastom);
    case AREA_DATA:
      return state.set('areaData', action.area);
    case DEFAULT_ACTION:
      return state;
    default:
      return state;
  }
}

export default ShiftReducer;
