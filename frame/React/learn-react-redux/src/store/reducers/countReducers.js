
import counter from "../state/countReducers";
const countReducers = (state = { ...counter }, action) => {
  switch (action.type) {
    case 'ADD_NUMBER':
      return { ...state, counter: state.counter + action.num };
    case 'SUB_NUMBER':
      return { ...state, counter: state.counter - action.num };
    default:
      return state;
  }
}
export default countReducers
