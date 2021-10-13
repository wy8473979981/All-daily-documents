import { combineReducers } from 'redux';
//reducers
import ColorReducers from "./colorReducers";
import CountReducers from "./countReducers";
 
const allReducers = {
    ColorReducers,
    CountReducers
};
 
const rootReducers = combineReducers(allReducers);
 
export default rootReducers