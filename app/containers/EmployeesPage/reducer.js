/*
 *
 * EmployeesPage reducer
 *
 */


import { fromJS } from 'immutable';
import { DEFAULT_ACTION, SUBMIT_ACTION, LOAD_OPERATION_DATA,
  AREA_DATA, POSITION_DATA,
 } from './constants';

const initialState = fromJS({
  employeesData: [
    {
      id: 1,
      first_name: 'Имя',
      last_name: 'Фамилия',
      patronymic: 'Отчество',
      position_id: 1,
      production_area_id: 2,
      photo: 'http://www.membermind.pro/wp-content/uploads/2015/08/spikl.png',
      // login: 'ivan',
      // password: '12345',
      appLink: '/employee/1',
    },
  ],
  areaData: [
    {
      id: 1,
      name: 'Распиловочная зона',
      filial_id: 1,
    },
  ],
  positionData: [
    {
      id: 1,
      name: 'Слесарь',
    },
  ],
});

function employeesReducer(state = initialState, action) {
  switch (action.type) {
    case SUBMIT_ACTION:
      return state.set('employeesData', state.get('employeesData').concat(action.employees));
    case LOAD_OPERATION_DATA:
      const dataCastom = action.employee.map((item) => {
        return {
          id: item.id,
          first_name: item.first_name,
          last_name: item.last_name,
          patronymic: item.patronymic,
          position_id: item.position_id[0] ? item.position_id[0].name : null,
          position_id_id: item.position_id[0] ? item.position_id[0].id : null,
          production_area_id: item.production_area_id[0] ? item.production_area_id[0].name : null,
          production_area_id_id: item.production_area_id[0] ? item.production_area_id[0].id : null,
          // photo: 'http://www.membermind.pro/wp-content/uploads/2015/08/spikl.png',
          photo: item.photo,
          // login: 'ivan',
          // password: '12345',
          appLink: `/employee/${item.id}`,
        };
      });
      return state.set('employeesData', dataCastom);
    case AREA_DATA:
      return state.set('areaData', action.area);
    case POSITION_DATA:
      return state.set('positionData', action.position);
    case DEFAULT_ACTION:
      return state;
    default:
      return state;
  }
}

export default employeesReducer;
