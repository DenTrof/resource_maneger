import createHistory from 'history/createBrowserHistory';
import configureStore from './configureStore';


const initialState = {};
const history = createHistory();
const store = configureStore(initialState, history);

export {
  history,
  store,
};
