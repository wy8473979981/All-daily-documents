// import { SOME_MUTATION } from '../types.js'

export default {
  // changeUser (state, payload) {
  //   console.log(payload, '----payload')
  //   state.userInfo = { ...state.userInfo, ...payload }
  // }
  saveUserInfo(state, payload) {
    console.log(payload, '---payload')
    state.userInfo = { ...state.userInfo, ...payload }
  },
  saveLandType(state, payload) {
    console.log(payload)
    // state.landType = { ...state.landType, ...payload }
    state.landType = { ...payload }
  },
  saveCityType(state, payload) {
    // state.cityType = { ...state.cityType, ...payload }
    state.cityType = { ...payload }
  },
  saveLandKind(state, payload) {
    // state.landKind = { ...state.landKind, ...payload }
    state.landKind = { ...payload }
  },
  saveCpaType(state, payload) {
    // state.cpaType = { ...state.cpaType, ...payload }
    state.cpaType = { ...payload }
  },
  saveCpaKind(state, payload) {
    // state.cpaKind = { ...state.cpaKind, ...payload }
    state.cpaKind = { ...payload }
  },
  saveTableHeight(state, payload) {
    // state.cpaKind = { ...state.cpaKind, ...payload }
    state.tableHeight = payload
  },
  saveIsShowContent(state, payload) {
    state.isShowContent = payload
  },
  setCompanyName(state, payload) {
    //设置公司名称
    state.companyName = payload.companyName
  },
  setInstanceId(state, payload) {
    state.instanceId = payload.instanceId
  },
  setViewInstanceId(state, payload) {
    state.viewInstanceId = payload.viewInstanceId
  },
  setBudgetYear(state, payload) {//预算年度
    state.budgetYear = payload.budgetYear
  },
  saveMenus(state, { type, data }) {
    data.map(item => {
      item.value = Number(item.dictCd)
    })
    switch (type) {
      case 'rent_way':
        state.rentList = data;
        //localStorage.setItem("rentList",data)
        break;
      case 'wgPayWay':
        state.wgPayWayList = data;
        //localStorage.setItem("wgPayWayList",data)
        break;
      case 'cyclePayWay':
        state.cyclePayWayList = data;
        //localStorage.setItem("cyclePayWayList",data)
        break;
      case 'sellWay':
        state.sellWayList = data;
        //localStorage.setItem("sellWayList",data)
        break;
      case 'bizFormat':
        state.bizList = data;
        //localStorage.setItem("bizList",data)
        break;
      case 'contractType':
        state.contractTypeList = data;
        //localStorage.setItem("contractTypeList",data)
        break;
      case 'houseType':
        state.houseTypeList = data;
        //localStorage.setItem("contractTypeList",data)
        break;
      case 'storeChargeType':
        state.storeChargeTypeList = data;
        break;
      case 'isNewStore':
        state.storeTypeList = data;
        break;
      case 'multiType':
        state.multiTypeList = data;
        break;
      case 'saleInitialStatus':
        state.saleInitialStatusList = data;
        break;
      case 'issuingLayoutCd':
        state.layoutCdList = data;
        break;
      case 'cyclePayWayStore':
        state.cyclePayWayStoreList = data;
      case 'contType':
        state.contTypeList = data;
      case 'oweType':
        state.oweTypeList = data;
        break
      case 'zxMultiType':
        state.zxMultiTypeList = data;
        break;
      case 'chargeType':
        state.chargeTypeList = data;
        break;
      case 'wyBizType':
        state.wyBizTypeList = data;
        break;
    }
  }
}
