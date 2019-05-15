import axios from 'axios';
import { store } from './store';

import { logoutAction } from 'containers/App/actions';


const API_PATH = 'https://rm.proj.biz/api';
// const API_PATH = 'http://localhost:5000';

class API {
  constructor(options) {
    const self = this;

    this.instance = axios.create({
      baseURL: API_PATH,
      headers: {},
    });


    this.instance.interceptors.request.use((config) => {
      config.headers.common.Authorization = self.getToken();
      return config;
    });


    this.instance.interceptors.response.use((response) => response, (error) => {
        // Do something with response error

        // if (!error.status) {
        //   // network error
        //   return null
        // }

      if (error.response.status === 401) {
        store.dispatch(logoutAction());
      }

      return null;
    });
  }

  getToken() {
    return store.getState().getIn(['app', 'session_id']);
  }

  get(path, params = {}) {
    return this.instance.get(path, {
      params,
    });
  }

  put(path, body = {}) {
    return this.instance.put(path, body);
  }

  post(path, body = {}) {
    return this.instance.post(path, body);
  }

  delete(path = {}) {
    return this.instance.delete(path, {});
  }

}


export const api = new API();
