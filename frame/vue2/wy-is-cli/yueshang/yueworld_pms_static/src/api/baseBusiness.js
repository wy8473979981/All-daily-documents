/*
 * @Author: qiuyw
 * @LastEditors: fhj
 * @Description: api接口示例
 * @Description: 基础数据-多经信息
 */
import { Api } from '@/utils/api'

export class BaseBusinessApi extends Api {
  // 一铺一价列表
  shopOnePriceList = (params) => {
    return this.post(`/mock/26/pms/MoreBusiness/ShopOnePrice/list`, params)
  }
  // 一铺一价审核列表
  shopOnePriceAuditList = (params) => {
    return this.post(`/mock/26/pms/MoreBusiness/ShopOnePriceAudit/list`, params)
  }
  // 一铺一价审核详情
  shopOnePriceAuditDetail = (params) => {
    return this.post(`/mock/26/pms/MoreBusiness/ShopOnePriceAudit/detail`, params)
  }
  // 一铺一价审核删除
  shopOnePriceAuditDelete = (params) => {
    return this.post(`/mock/26/pms/MoreBusiness/ShopOnePriceAudit/delete`, params)
  }
  // 一铺一价审核保存
  shopOnePriceAuditSave = (params) => {
    return this.post(`/mock/26/pms/MoreBusiness/ShopOnePriceAudit/save`, params)
  }
  // 一铺一价发起审核
  shopOnePriceAuditAudit = (params) => {
    return this.post(`/mock/26/pms/MoreBusiness/ShopOnePriceAudit/audit`, params)
  }

   // 多经-点位信息-列表
   PointInfoListList = (params) => {
     return this.post(`/mock/26/pms/MoreBusiness/PointInfoList/list`, params)
   }
}

export const baseBusinessApi = new BaseBusinessApi()

