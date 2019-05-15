/*
 *
 * PostPage actions
 *
 */

import {
  DEFAULT_ACTION, SUBMIT_ACTION,
  LOAD_POST_DATA, POST_DATA_ERROR, POST_DATA,

} from './constants';

export function submitAction(post) {
  return {
    type: SUBMIT_ACTION,
    post,
  };
}

export function ServerDataLoaded(posts) {
  return {
    type: LOAD_POST_DATA,
    posts,
  };
}

export function ServerDataLoadingError(error) {
  return {
    type: POST_DATA_ERROR,
    error,
  };
}

export function PostDataLoaded(area) {
  return {
    type: POST_DATA,
    area,
  };
}

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}
