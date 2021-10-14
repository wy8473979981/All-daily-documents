/**
 * Created by mapbar_front on 2017/6/7.
 */
import { FILTER } from '../action/action';
export default function visibilityFilter(state = "SHOW_ALL",action) {
    switch (action.type){
        case FILTER:
            return action.filter;
        default:
            return state
    }
}