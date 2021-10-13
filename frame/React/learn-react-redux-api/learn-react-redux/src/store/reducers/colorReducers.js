import themeColor from "../state/colorReducers";
const colorReducers = (state = {...themeColor}, action) => {
    if (!state) return {
      themeColor: 'red'
    }
    switch (action.type) {
      case 'CHANGE_COLOR':
        return { ...state, themeColor: action.themeColor }//这里action传入动态色值并同步到state
      default:
        return state
    }
}
export default colorReducers