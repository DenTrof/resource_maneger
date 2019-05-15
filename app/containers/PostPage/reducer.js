/*
 *
 * PositionPage reducer
 *
 */
import { fromJS } from 'immutable';
import { DEFAULT_ACTION, SUBMIT_ACTION, LOAD_POST_DATA, POST_DATA } from './constants';

const initialState = fromJS({
  postData: [
    {
      id: 1,
      name: 'Фрезерный станок',
      production_area_id: 9,
      production_area_id_id: 9,
    },
  ],
  postsData: [
    {
      id: 1,
      name: 'Фрезеровочная зона',
      filial_id: 10,
    },
    {
      id: 2,
      name: 'Распиловочная зона',
      filial_id: 12,
    },

  ],
  postTypes: [
    {
      id: 1,
      name: 'Фрезерный станок',
    },
    {
      id: 2,
      name: 'Сверлильный станок',
    },
  ],

});

function positionReducer(state = initialState, action) {
  switch (action.type) {
    case SUBMIT_ACTION:
      return state.set('postData', state.get('postData').concat(action.post));
    case LOAD_POST_DATA:
      const areaDataCastom = action.posts.map((item) => {
        return {
          id: item.id,
          name: item.name,
          production_area_id: item.production_area_id[0] ? item.production_area_id[0].name : null,
          production_area_id_id: item.production_area_id[0] ? item.production_area_id[0].id : null,
        };
      });
      return state.set('postData', areaDataCastom);
    case POST_DATA:
      return state.set('postsData', action.area);
    case DEFAULT_ACTION:
      return state;
    default:
      return state;
  }
}

export default positionReducer;
