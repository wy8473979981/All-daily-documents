export default {
  saveUserInfo (state, data) {
    console.log(state, data)
    state.userInfo = { ...data }
  },
  changeisLoading (state, data) {
    console.log(state, data)
    // state.isLoading = { ...data }
  },
  saveApproveDetail (state, data) {
    console.log(state, data)
    state.approveDetail = { ...data }
  },
  saveFileList (state, data) {
    console.log(state, data)
    state.fileList = { ...data }
  },
  saveBlOrgTreeList (state, data) {
    console.log(state, data)
    // state.blOrgTreeList = { text: "宝龙", children: data }
    if (!data) {
      state.bljtOrgTreeList = {}
      state.bldcOrgTreeList = {}
    } else {
      state.bljtOrgTreeList = { ...data[0] }
      state.bldcOrgTreeList = { ...data[1] }
    }
  },
}
