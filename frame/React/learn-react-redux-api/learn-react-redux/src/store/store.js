import {createStore} from 'redux';
import RootReducers from './reducers/index';
 
const store = createStore(RootReducers);
 
export default store;