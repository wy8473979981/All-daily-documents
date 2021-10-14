/**
 * Created by mapbar_front on 2017/6/6.
 */
import todos from './todos';
import { combineReducers } from 'redux';
import visibilityFilter from './filter';
const todoApp = combineReducers({
    todos,
    visibilityFilter
});
export default todoApp;