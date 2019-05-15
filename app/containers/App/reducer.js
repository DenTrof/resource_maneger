/*
 *
 * App reducer
 *
 */

import { AbilityBuilder } from '@casl/ability';

import { fromJS } from 'immutable';
import Cookie from 'app-cookie';

import { LOGOUT_ACTION, LOGIN_SUCCESS } from './constants';


/**
 * Defines how to detect object's type: https://stalniy.github.io/casl/abilities/2017/07/20/define-abilities.html
 */
function subjectName(item) {
  if (!item || typeof item === 'string') {
    return item;
  }

  return 'Todo';

  return item.__type;
}


function createPermissions(permissions) {
  const permissionObject = AbilityBuilder.define({ subjectName }, () => {});
  permissionObject.update(permissions);
  return permissionObject;
}


const initialState = fromJS({
  is_logined: true,
  session_id: Cookie.getSessionId(),
  gravatar: '',
  permissions: createPermissions([]),
});


function appReducer(state = initialState, action) {
  switch (action.type) {
    // case DEFAULT_ACTION:
    //   return state;
    case LOGOUT_ACTION:
      return state.merge({
        session_id: null,
        gravatar: '',
        permissions: createPermissions([]),
        is_logined: false,
      });
    case LOGIN_SUCCESS:
      return state.merge({
        session_id: action.data.session_id,
        gravatar: action.data.gravatar,
        permissions: createPermissions(action.data.permissions),
        is_logined: true,
      });


    default:
      return state;
  }
}

export default appReducer;
