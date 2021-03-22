// import { SOME_MUTATION } from '../types.js'

export default {
  // changeUser (state, payload) {
  //   console.log(payload, '----payload')
  //   state.userInfo = { ...state.userInfo, ...payload }
  // }
  saveUserInfo (state, payload) {
    console.log(payload, '---payload')
    state.userInfo = { ...state.userInfo, ...payload }
  },
  saveLandType (state, payload) {
    console.log(payload)
    // state.landType = { ...state.landType, ...payload }
    state.landType = { ...payload }
  },
  saveCityType (state, payload) {
    // state.cityType = { ...state.cityType, ...payload }
    state.cityType = { ...payload }
  },
  saveLandKind (state, payload) {
    // state.landKind = { ...state.landKind, ...payload }
    state.landKind = { ...payload }
  },
  saveCpaType (state, payload) {
    // state.cpaType = { ...state.cpaType, ...payload }
    state.cpaType = { ...payload }
  },
  saveCpaKind (state, payload) {
    // state.cpaKind = { ...state.cpaKind, ...payload }
    state.cpaKind = { ...payload }
  },
  saveTableHeight(state, payload) {
    // state.cpaKind = { ...state.cpaKind, ...payload }
    state.tableHeight = payload
  },
}
