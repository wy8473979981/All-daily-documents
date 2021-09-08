/*
 * @Author: agz
 * @LastEditors: Please set LastEditors
 * @Description: api接口示例
 * @Description: 基础数据-项目信息
 */
import { Api } from '@/utils/api'

export class BaseProjectApi extends Api {
  // 上传图片接口
  fileUpload = (params) => {
    return this.post("/mock/26/pms/file/upload", params)
  }
  // 区域维护列表查询
  areaMaintenanceList = (params) => {
    return this.post(`/mock/26/pms/bisOffice/areaMaintenance/list`, params)
  }
  // 区域维护获取区域code
  areaMaintenanceAreaCode = (params) => {
    return this.post(`/mock/26/pms/bisOffice/areaMaintenance/areaCode`, params)
  }
  // 区域维护-新增
  areaMaintenanceAdd = (params) => {
    return this.post(`/mock/26/pms/bisOffice/areaMaintenance/add`, params)
  }
  // 区域维护编辑
  areaMaintenanceEdit = (params) => {
    return this.post(`/mock/26/pms/bisOffice/areaMaintenance/edit`, params)
  }

  // 城市维护-新增
  cityMaintenanceAdd = (params) => {
    return this.post(`/mock/26/pms/bisOffice/cityMaintenance/add`, params)
  }
  // 城市维护-城市code
  cityMaintenanceCityCode = (params) => {
    return this.post(`/mock/26/pms/bisOffice/cityMaintenance/cityCode`, params)
  }
  // 城市维护-编辑
  cityMaintenanceEdit = (params) => {
    return this.post(`/mock/26/pms/bisOffice/urbanMaintenance/edit`, params)
  }
  // 城市维护列表
  cityMaintenanceList = (params) => {
    return this.post(`/mock/26/pms/bisOffice/urbanMaintenance/list`, params)
  }
  // 项目维护列表
  projectMaintenanceList = (params) => {
    return this.post(`/mock/26/pms/bisOffice/projectMaintenance/list`, params)
  }
  // 项目维护编辑和新增，type:1新增，2编辑
  projectMaintenanceHandler = (params) => {
    return this.post(`/mock/26/pms/bisOffice/projectMaintenance/handler`, params)
  }
  // 项目维护删除
  projectMaintenanceDel = (params) => {
    return this.post(`/mock/26/pms/bisOffice/projectMaintenance/del`, params)
  }
  // 项目维护-甲方合同唯一字段校验
  projectMaintenanceContractVeridical = (params) => {
    return this.post(`/mock/26/pms/bisOffice/projectMaintenance/contractVeridical`, params)
  }
  // 楼栋维护-列表
  buildMaintenanceList = (params) => {
    return this.post(`/mock/26/pms/bisOffice/buildMaintenance/list`, params)
  }
  //楼栋维护-编辑和新增 1新增，2编辑，新增做字段唯一校验
  buildMaintenanceHandler = (params) => {
    return this.post(`/mock/26/pms/bisOffice/buildMaintenance/handler`, params)
  }
  //楼栋维护-删除
  buildMaintenanceDel = (params) => {
    return this.post(`/mock/26/pms/bisOffice/buildMaintenance/del`, params)
  }
  // 楼栋维护-获取楼栋编码
  buildMaintenanceBuildCode = (params) => {
    return this.post(`/mock/26/pms/bisOffice/buildMaintenance/buildCode`, params)
  }
  // 楼层维护列表
  floorMaintenanceList = (params) => {
    return this.post(`/mock/26/pms/bisOffice/floorMaintenance/list`, params)
  }
  // 楼层维护编辑
  floorMaintenanceEdit = (params) => {
    return this.post(`/mock/26/pms/bisOffice/floorMaintenance/edit`, params)
  }
  floorMaintenanceDel = (params) => {
    return this.post(`/mock/26/pms/bisOffice/floorMaintenance/del`, params)
  }
  //商铺维护列表
  shopsMaintenanceList = (params) => {
    return this.post(`/mock/26/pms/bisOffice/shopsMaintenance/list`, params)
  }
  //商铺维护新增和编辑
  shopsMaintenanceHandler = (params) => {
    return this.post(`/mock/26/pms/bisOffice/shopsMaintenance/handler`, params)
  }
  //商铺维护-审核
  shopsMaintenanceReview = (params) => {
    return this.post(`/mock/26/pms/bisOffice/shopsMaintenance/review`, params)
  }
  //商铺维护-失效
  shopsMaintenanceEffect = (params) => {
    return this.post(`/mock/26/pms/bisOffice/shopsMaintenance/effect`, params)
  }
  //商铺维护面积变更-列表
  shopsModifyMaintenanceList = (params) => {
    return this.post(`/mock/26/pms/bisOffice/shopsModifyMaintenance/list`, params)
  }
  //商铺维护面积变更-审核
  shopsModifyMaintenanceReview = (params) => {
    return this.post(`/mock/26/pms/bisOffice/shopsModifyMaintenance/review`, params)
  }
  //商铺维护面积变更-删除
  shopsModifyMaintenanceDel = (params) => {
    return this.post(`/mock/26/pms/bisOffice/shopsModifyMaintenance/del`, params)
  }
  //商铺维护面积变更-审核
  shopsModifyMaintenanceExamine = (params) => {
    return this.post(`/mock/26/pms/bisOffice/shopsModifyMaintenance/examine`, params)
  }
  // 拆合铺列表
  openCloseShopList = (params) => {
    return this.post(`/mock/26/pms/bisOffice/OpenCloseShop/list`, params)
  }
  // 拆合铺审核
  openCloseShopAudit = (params) => {
    return this.post(`/mock/26/pms/bisOffice/OpenCloseShop/audit`, params)
  }
  // 拆合铺保存
  openCloseShopSave = (params) => {
    return this.post(`/mock/26/pms/bisOffice/OpenCloseShop/save`, params)
  }
  // 拆合铺详情
  openCloseShopDetail = (params) => {
    return this.post(`/mock/26/pms/bisOffice/OpenCloseShop/detail`, params)
  }
  // 拆合铺删除
  openCloseShopDelete = (params) => {
    return this.post(`/mock/26/pms/bisOffice/OpenCloseShop/delete`, params)
  }
  // 拆合铺项目基本信息
  openCloseShopProjectInfo = (params) => {
    return this.post(`/mock/26/pms/bisOffice/OpenCloseShop/projectInfo`, params)
  }
  // 一铺一价列表
  shopOnePriceList = (params) => {
    return this.post(`/mock/26/pms/bisOffice/ShopOnePrice/list`, params)
  }
  // 一铺一价审核列表
  shopOnePriceAuditList = (params) => {
    return this.post(`/mock/26/pms/bisOffice/ShopOnePriceAudit/list`, params)
  }
  // 一铺一价审核详情
  shopOnePriceAuditDetail = (params) => {
    return this.post(`/mock/26/pms/bisOffice/ShopOnePriceAudit/detail`, params)
  }
  // 一铺一价审核删除
  shopOnePriceAuditDelete = (params) => {
    return this.post(`/mock/26/pms/bisOffice/ShopOnePriceAudit/delete`, params)
  }
  // 一铺一价审核保存
  shopOnePriceAuditSave = (params) => {
    return this.post(`/mock/26/pms/bisOffice/ShopOnePriceAudit/save`, params)
  }
  // 一铺一价发起审核
  shopOnePriceAuditAudit = (params) => {
    return this.post(`/mock/26/pms/bisOffice/ShopOnePriceAudit/audit`, params)
  }
  // 编码规则列表
  configCodeList = (params) => {
    return this.post(`/mock/26/pms/bisOffice/configCode/list`, params)
  }
  // 编码规则编辑
  configCodeEdit = (params) => {
    return this.post(`/mock/26/pms/bisOffice/configCode/edit`, params)
  }
  // 编码规则删除
  configCodeDel = (params) => {
    return this.post(`/mock/26/pms/bisOffice/configCode/del`, params)
  }
}

export const baseProjectApi = new BaseProjectApi()

