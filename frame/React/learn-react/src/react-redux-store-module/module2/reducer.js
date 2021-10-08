import {
  MATH_RANDOM
} from './constants.js';

const initialState = {
  random: Math.random()
}

function reducer (state = initialState, action) {
  switch (action.type) {
    case MATH_RANDOM:
      return { ...state, random: state.random + ' + ' + action.random };
    default:
      return state;
  }
}

export default reducer;
