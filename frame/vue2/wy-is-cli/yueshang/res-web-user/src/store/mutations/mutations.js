// import { SOME_MUTATION } from '../types.js'

export default {
  // changeUser (state, payload) {
  //   console.log(payload, '----payload')
  //   state.userInfo = { ...state.userInfo, ...payload }
  // }
  saveUserInfo (state, payload) {
    state.userInfo = { ...state.userInfo, ...payload }
  },
  saveSysInfo (state, payload) {
    state.sysInfo = { ...state.sysInfo, ...payload }
  },
  saveAllFileList (state, data) {
    state.allFileList = { ...data }
  },
  saveApproveDetail (state, data) {
    state.approveDetail = { ...data }
  },
  saveMenuTreeItem (state, data) {
    state.menuTreeItem = { ...data }
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
    // state.capType = { ...state.capType, ...payload }
    state.capType = { ...payload }
  },
  saveCpaKind (state, payload) {
    // state.capKind = { ...state.capKind, ...payload }
    state.capKind = { ...payload }
  },
}
