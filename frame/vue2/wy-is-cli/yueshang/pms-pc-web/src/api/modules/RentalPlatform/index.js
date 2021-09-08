import { Api } from 'utils/api'
export class RentalPlatform extends Api {
  /* 租控系统 */
  // 页面开始 根据项目 获取项目的铺位，楼层等信息
  getInfoByProject = (params) => {
    return this.post('/plpms-rent-control/rc/rc-store/queryProject', params)
  }
  // 根据楼层 获取项目的铺位等信息
  getInfoByFloor = (params) => {
    return this.post('/plpms-rent-control/rc/rc-store/queryFloor', params)
  }
  // 根据地图选择铺位 获取铺位详情信息
  getInfoByRcStore = (params) => {
    return this.post('/plpms-rent-control/rc/rc-store/queryRcStore', params)
  }
  // table 弹窗获取数据的接口统一使用
  getDialogTableList = (url, params) => {
    return this.post(url, params)
  }

  // 获取铺位列表信息
  getRcStorePageList = (params) => {
    return this.post('/plpms-rent-control/rc/rc-store/getRcStorePageList', params)
  }
  // 绑定铺位
  bindStore = (params) => {
    return this.post('/plpms-rent-control/rc/rc-store-binding-rel/bindStore', params)
  }
  // 解除绑定铺位
  rmvBindStore = (params) => {
    return this.post('/plpms-rent-control/rc/rc-store-binding-rel/rmvBindStore', params)
  }
  // 铺位绑定进度
  storeBindInfo = (params) => {
    return this.post('/plpms-rent-control/rc/rc-store-binding-rel/storeBindInfo', params)
  }

  // 根据铺位id查询所有合同列表
  getAllCont = (params) => {
    return this.post('/plpms-rent-control/rc/bis-cont/getAllCont', params)
  }
  // 根据铺位id查询商家信息 查询招商中列表
  getMerchant = (params) => {
    return this.post('/plpms-rent-control/rc/bis-zs-plan/getMerchant', params)
  }
  // 根据合同id查询对比信息
  getComparedInfo = (params) => {
    return this.post('/plpms-rent-control/rc/bis-cont/getComparedInfo', params)
  }
  // 根据合同id查询合同信息
  getContInfo = (params) => {
    return this.post('/plpms-rent-control/rc/bis-cont/getContInfo', params)
  }
  // 根据合同id或招商计划id查询招商进度
  getZsPlan = (params) => {
    return this.post('/plpms-rent-control/rc/bis-zs-plan/getZsPlan', params)
  }

  // 地图获取铺位列表
  queryStoreList = (params) => {
    return this.post('/plpms-rent-control/rc/basics/queryStoreRelList', params)
  }

  // 获取带颜色业态列表
  getFormatColorList = (params) => {
    return this.post('/plpms-rent-control/rc/rc-format-color/getFormatColorList', params)
  }
  // 获取部门员工
  getDepartmentStaff = (params) => {
    return this.post('/plpms-rent-control/rc/bis-staff/Department', params)
  }

  // 楼层查询符合条件的铺位
  getPoiId = (params) => {
    return this.post('/plpms-rent-control/rc/rc-store/getPoiId', params)
  }
  // 楼层搜索店铺  铺位列表信息（分页）
  getRcStorePageMiniList = (params) => {
    return this.post('/plpms-rent-control/rc/rc-store/getRcStorePageMiniList', params)
  }

  // 获取责任人铺位分配信息
  getManagerStoreInfo = (params) => {
    return this.post('/plpms-rent-control/rc/bis-store-manager/getManagerStoreInfo', params)
  }
  // 添加责任人
  addManager = (params) => {
    return this.post('/plpms-rent-control/rc/bis-store-manager/addManager', params)
  }
  // 删除责任人
  deleteManagerById = (params) => {
    return this.post('/plpms-rent-control/rc/bis-store-manager/deleteManagerById', params)
  }
  // 获取责任人铺位元素列表
  getManagerAndStoreInfo = (params) => {
    return this.post('/plpms-rent-control/rc/bis-store-manager/getManagerAndStoreInfo', params)
  }
  // 分配责任人铺位
  sendStore2manager = (params) => {
    return this.post('/plpms-rent-control/rc/bis-store-manager/sendStore2manager', params)
  }
  // 人员分配 获取未分配的铺位元素列表
  getUnMatchStoreInfo = (params) => {
    return this.post('/plpms-rent-control/rc/bis-store-manager/getUnMatchStoreInfo', params)
  }

}

export const rentalPlatform = new RentalPlatform()