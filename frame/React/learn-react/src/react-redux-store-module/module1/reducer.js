import {
  ADD_NUMBER
} from './constants.js';

const initialState = {
  counter: 1
}

function reducer(state = initialState, action) {
  switch(action.type) {
    case ADD_NUMBER:
      return {...state, counter: state.counter + action.count};
    default:
      return state;
  } 
}

export default reducer;
