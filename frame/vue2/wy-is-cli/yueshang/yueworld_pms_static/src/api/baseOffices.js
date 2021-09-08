/*
 * @Author: agz
 * @LastEditors: Please set LastEditors
 * @Description: api接口示例
 * @Description: 基础数据写字楼-写字楼管理
 */
import { Api } from '@/utils/api'

export class BaseOfficesApi extends Api {
  // 项目维护列表
  projectMaintenanceList = (params) => {
    return this.post(`/mock/26/pms/bisOffice/projectMaintenance/dataList`, params)
  }
  // 项目维护编辑和新增，type:1新增，2编辑
  projectMaintenanceHandler = (params) => {
    return this.post(`/mock/26/pms/bisOffice/projectMaintenance/handler`, params)
  }
  // 项目维护删除
  projectMaintenanceDel = (params) => {
    return this.post(`/mock/26/pms/bisOffice/projectMaintenance/dataDel`, params)
  }
  // 项目维护-甲方合同唯一字段校验
  projectMaintenanceContractVeridical = (params) => {
    return this.post(`/mock/26/pms/bisOffice/office/projectMaintenance/contractVeridical`, params)
  }
  // 楼栋维护-列表
  buildMaintenanceList = (params) => {
    return this.post(`/mock/26/pms/bisOffice/buildMaintenance/dataList`, params)
  }
  //楼栋维护-编辑和新增 1新增，2编辑，新增做字段唯一校验
  buildMaintenanceHandler = (params) => {
    return this.post(`/mock/26/pms/bisOffice/buildMaintenance/addEdit`, params)
  }
  //楼栋维护-删除
  buildMaintenanceDel = (params) => {
    return this.post(`/mock/26/pms/bisOffice/buildMaintenance/dataDel`, params)
  }
  // 楼栋维护-获取楼栋编码
  buildMaintenanceBuildCode = (params) => {
    return this.post(`/mock/26/pms/bisOffice/buildMaintenance/getBuildCode`, params)
  }
  // 楼层维护列表
  floorMaintenanceList = (params) => {
    return this.post(`/mock/26/pms/bisOffice/floorMaintenance/dataList`, params)
  }
  // 楼层维护编辑
  floorMaintenanceEdit = (params) => {
    return this.post(`/mock/26/pms/bisOffice/floorMaintenance/dataEdit`, params)
  }
  floorMaintenanceDel = (params) => {
    return this.post(`/mock/26/pms/bisOffice/floorMaintenance/dataDel`, params)
  }
  //租赁单元-列表
  officeUnitMaintenanceList = (params) => {
    return this.post(`/mock/26/pms/bisOffice/officeUnitMaintenance/list`, params)
  }
  //租赁单元新增和编辑
  officeUnitMaintenanceHandler = (params) => {
    return this.post(`/mock/26/pms/bisOffice/officeUnitMaintenance/handler`, params)
  }
  //租赁单元-审核
  officeUnitMaintenanceReview = (params) => {
    return this.post(`/mock/26/pms/bisOffice/officeUnitMaintenance/review`, params)
  }
  //租赁单元-失效
  officeUnitMaintenanceEffect = (params) => {
    return this.post(`/mock/26/pms/bisOffice/officeUnitMaintenance/effect`, params)
  }
  //租赁单元面积变更-列表
  officeUnitModifyMaintenanceList = (params) => {
    return this.post(`/mock/26/pms/bisOffice/officeUnitModifyMaintenance/list`, params)
  }
  //租赁单元面积变更-审核
  officeUnitModifyMaintenanceReview = (params) => {
    return this.post(`/mock/26/pms/bisOffice/officeUnitModifyMaintenance/review`, params)
  }
  //租赁单元面积变更-删除
  officeUnitModifyMaintenanceDel = (params) => {
    return this.post(`/mock/26/pms/bisOffice/officeUnitModifyMaintenance/del`, params)
  }
  //租赁单元面积变更-删除
  officeUnitModifyMaintenanceExamine = (params) => {
    return this.post(`/mock/26/pms/bisOffice/officeUnitModifyMaintenance/examine`, params)
  }



  // 拆合铺列表
  openCloseOfficesList = (params) => {
    return this.post(`/mock/26/pms/BaseOffice/OpenCloseOffices/list`, params)
  }
  // 拆合铺审核
  openCloseOfficesAudit = (params) => {
    return this.post(`/mock/26/pms/BaseOffice/OpenCloseOffices/audit`, params)
  }
  // 拆合铺保存
  openCloseOfficesSave = (params) => {
    return this.post(`/mock/26/pms/BaseOffice/OpenCloseOffices/save`, params)
  }
  // 拆合铺详情
  openCloseOfficesDetail = (params) => {
    return this.post(`/mock/26/pms/BaseOffice/OpenCloseOffices/detail`, params)
  }
  // 拆合铺删除
  openCloseOfficesDelete = (params) => {
    return this.post(`/mock/26/pms/BaseOffice/OpenCloseOffices/delete`, params)
  }
  // 拆合铺项目基本信息
  openCloseOfficesProjectInfo = (params) => {
    return this.post(`/mock/26/pms/BaseOffice/OpenCloseOffices/projectInfo`, params)
  }
  // 一铺一价列表
  officesOnePriceList = (params) => {
    return this.post(`/mock/26/pms/BaseOffice/OfficesOnePrice/list`, params)
  }
  // 一铺一价审核列表
  officesOnePriceAuditList = (params) => {
    return this.post(`/mock/26/pms/BaseOffice/OfficesOnePriceAudit/list`, params)
  }
  // 一铺一价审核详情
  officesOnePriceAuditDetail = (params) => {
    return this.post(`/mock/26/pms/BaseOffice/OfficesOnePriceAudit/detail`, params)
  }
  // 一铺一价审核删除
  officesOnePriceAuditDelete = (params) => {
    return this.post(`/mock/26/pms/BaseOffice/OfficesOnePriceAudit/delete`, params)
  }
  // 一铺一价审核保存
  officesOnePriceAuditSave = (params) => {
    return this.post(`/mock/26/pms/BaseOffice/OfficesOnePriceAudit/save`, params)
  }
  // 一铺一价发起审核
  officesOnePriceAuditAudit = (params) => {
    return this.post(`/mock/26/pms/BaseOffice/OfficesOnePriceAudit/audit`, params)
  }
}

export const baseOfficesApi = new BaseOfficesApi()

