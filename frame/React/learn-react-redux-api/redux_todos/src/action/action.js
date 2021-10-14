/**
 * Created by mapbar_front on 2017/6/6.
 */
export const ADD_TODO = "ADD_TODO";
export const TOGGLE_TODO = "TOGGLE_TODO";
export const FILTER = "FILTER";
export const FilterType = ["SHOW_ALL","SHOW_ACTIVE","SHOW_COMPLETED"];

export function addTodo(text) {
    return {
        type: ADD_TODO,
        text
    }
}
export function toggle_todo(index) {
    return {
        type: TOGGLE_TODO,
        index
    }
}
export function filter(filter) {
    return {
        type: FILTER,
        filter
    }
}