/*
 * @Author: fhj
 * @LastEditors: zengcheng
 * @Description: api接口示例
 * @Description: 基础数据（写字楼）
 */
import { Api } from '@/utils/api'

export class BuildingApi extends Api {
  // 获取基础数据列表楼栋维护
  builingList(param) {
    return this.post(`/mock/26/pms/bisOffice/building/list`, param)
  }

  // 获取基础数据楼栋维护新增
  buildinglistAdd(param) {
    return this.post(`/mock/26/pms/bisOffice/building/listAdd`, param)
  }

  // 获取基础数据楼栋维护表格编辑
  buildinglistEdit(param) {
    return this.post(`/mock/26/pms/bisOffice/building/edit`, param)
  }

  // 获取基础数据楼层维护表格
  bisOfficeFloorList(param) {
    return this.post(`/mock/26/pms/bisOffice/Floor/List`, param)
  }

  // 获取基础数据楼层维护表格编辑
  bisOfficeFloorEdit(param) {
    return this.post(`/mock/26/pms/bisOffice/Floor/Edit`, param)
  }
  // 获取基础数据（拆和铺列表数据）
  bisOfficPavinList(param) {
    return this.post(`/mock/26/pms/bisOffic/Pavin/List`, param)
  }

  // 获取基础数据（拆和铺列表数据提交和删除）
  bisOfficPavinRove(param) {
    return this.post(`/mock/26/pms/bisOffic/Pavin/Rove`, param)
  }

  // 获取基础数据（拆和铺编辑保存草稿和提交审核）
  bisOfficPavinDraft(param) {
    return this.post(`/mock/26/pms/bisOffice/Paving/Detail`, param)
  }

  // 获取基础数据（拆和铺编辑保存草稿和提交审核）
  bisOfficPavinDetailList(param) {
    return this.post(`/mock/26/pms/bisOffice/Paving/DetailList`, param)
  }
  // 获取基础数据（一铺一价列表数据）
  bisOfficeoneShopPricelist(param) {
    return this.post(`/mock/26/pms/bisOfficeone/Shop/Pricelist`, param)
  }
  // 获取基础数据（一铺一价详情数据）
  bisOfficeoneShopPriceDetails(param) {
    return this.post(`/mock/26/pms/bisOfficeone/Shop/PriceDetails`, param)
  }
  // 获取基础数据（一铺一价发起审核）
  bisOfficeoneShopPricExamine(param) {
    return this.post(`/mock/26/pms/bisOfficeone/ShopPriceDetails/examine`, param)
  }

  // 获取基础数据（一铺一价待审核列表）
  bisOfficeoneShopPricAuditList(param) {
    return this.post(`/mock/26/pms/bisOffice/Pricing/Audit/List`, param)
  }

  // 获取基础数据（一铺一价待审核详情和编辑）
  bisOfficePricingAuditAddAndEdit(param) {
    return this.post(`/mock/26/pms/bisOffice/pricingAudit/addAndEdit`, param)
  }
  // 获取基础数据（一铺一价待审核详情和编辑）
  bisOfficePricingAuditPreservation(param) {
    return this.post(`/mock/26/pms/bisOffice/pricingAudit/preservation`, param)
  }

  // 获取基础数据（企业库列表）
  buildingList = (param) => {
    return this.post(`/mock/26/pms/bisOffice/enterpriseLibrary/list`, param)
  }

  // 获取基础数据（企业库编辑加详情）
  enterpriseLibraryEdit(param) {
    return this.post(`/mock/26/pms/bisOffice/enterpriseLibrary/edit`, param)
  }
  // 获取基础数据（企业库变更列表）
  enterpriseLibraryChange = (param) => {
    return this.post(`/mock/26/pms/bisOffice/enterpriseLibraryChange/list`, param)
  }
  // 获取基础数据（项目维护表格）
  bisOfficeProjectList(param) {
    return this.post(`/mock/26/pms/bisOffice/project/list`, param)
  }
}

export const buildingApi = new BuildingApi()

