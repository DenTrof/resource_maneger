/*
 *
 * EmployeePage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION, LOAD_OPERATION_DATA,
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
    },
  ],
});

function employeeReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_OPERATION_DATA:
    const dataCastom = action.employee.map((item) => {
      return {
        id: item.id,
        first_name: item.first_name,
        last_name: item.last_name,
        patronymic: item.patronymic,
        position_id: item.position_id[0] ? item.position_id[0].name : null,
        production_area_id: item.production_area_id[0] ? item.production_area_id[0].name : null,
        // photo: 'http://www.membermind.pro/wp-content/uploads/2015/08/spikl.png',
        photo: item.photo,
        // login: 'ivan',
        // password: '12345',
      };
    });
    return state.set('employeeData', dataCastom);
    case DEFAULT_ACTION:
      return state;
    default:
      return state;
  }
}

export default employeeReducer;
