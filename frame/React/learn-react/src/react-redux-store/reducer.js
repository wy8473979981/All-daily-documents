const defaultState = {
  inputValue: '',
  list: []
}

function reducer (state = defaultState, action) {
  const newState = JSON.parse(JSON.stringify(state))
  switch (action.type) {
    case 'inputVlueChange':
      newState.inputValue = action.value
      return newState
    case 'addListData':
      newState.list.push(state.inputValue)
      newState.inputValue = ''
      return newState
    case 'deleateItem':
      newState.list.splice(action.value, 1)
      return newState
    default:
      return state;
  }
}

export default reducer;