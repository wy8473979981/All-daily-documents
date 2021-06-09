export default {
  saveUserInfo (state, payload) {
    state.userInfo = { ...state.userInfo, ...payload }
  },
  saveSysInfo (state, payload) {
    state.sysInfo = { ...state.sysInfo, ...payload }
  },
  saveLandType (state, payload) {
    state.landType = { ...payload }
  },
  saveCityType (state, payload) {
    state.cityType = { ...payload }
  },
  saveLandKind (state, payload) {
    state.landKind = { ...payload }
  },
  saveCpaType (state, payload) {
    state.capType = { ...payload }
  },
  saveCpaKind (state, payload) {
    state.capKind = { ...payload }
  },
  saveTableHeight(state, payload) {
    state.tableHeight = payload
  }
}
