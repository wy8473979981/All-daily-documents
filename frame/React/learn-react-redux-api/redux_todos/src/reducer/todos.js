/**
 * Created by mapbar_front on 2017/6/6.
 */
import { ADD_TODO,TOGGLE_TODO } from '../action/action';
export default function todos(state = [],action){
    switch (action.type) {
        case ADD_TODO:
            return [...state,{text:action.text,completed:false}];
        case TOGGLE_TODO:
            return [...state.slice(0,action.index),
        {"text":state[action.index].text,"completed":!state[action.index].completed},
        ...state.slice(action.index+1)];
        default:
            return state
    }
}