/*
 *
 * PositionPage reducer
 *
 */
import { fromJS } from 'immutable';
import { DEFAULT_ACTION, SUBMIT_ACTION, LOAD_CHANGE_DATA, 
  POST_DATA, AREA_DATA } from './constants';

const initialState = fromJS({
  changeData: [
    {
      id: 1,
      date: '18-01-2019',
      start_shift: '18-01-2019',
      shift_end: '18-01-2019',
      shift_number: 83,
      production_area_id: 5,
      post_id: 55,
      name: 'item.name',
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

function positionReducer(state = initialState, action) {
  switch (action.type) {
    case SUBMIT_ACTION:
      return state.set('changeData', state.get('changeData').concat(action.change));
    case LOAD_CHANGE_DATA:
      // console.log('action.equipment', action.equipment);
      const dataCastom = action.changes.map((item) => {
        return {
          id: item.id,
          date: item.date,
          start_shift: item.start_shift,
          shift_end: item.shift_end,
          shift_number: item.shift_number,
          production_area_id: item.production_area_id[0] ? item.production_area_id[0].name : null,
          production_area_id_id: item.production_area_id[0] ? item.production_area_id[0].id : null,
          post_id: item.post_id[0] ? item.post_id[0].name : null,
          post_id_id: item.post_id[0] ? item.post_id[0].id : null,
          name: item.name,
        };
      });
      return state.set('changeData', dataCastom);
    // state.set('equipmentData', action.equipment);
    case POST_DATA:
      return state.set('postData', action.post);
    case AREA_DATA:
      return state.set('areaData', action.area);
    case DEFAULT_ACTION:
      return state;
    default:
      return state;
  }
}

export default positionReducer;
