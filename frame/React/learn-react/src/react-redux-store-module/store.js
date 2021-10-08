import { createStore, combineReducers } from 'redux';
import * as module1 from './module1/reducer';
import * as module2 from './module2/reducer';

let store = createStore(
  combineReducers({ ...module1, ...module2 })
);

export default store;