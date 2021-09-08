/*
 * @Author: fhj
 * @LastEditors: fhj
 * @Description: api接口示例
 * @Description: 基础数据
 */
import { Api } from '@/utils/api'
export class BaseApi extends Api {
  // 获取商铺树级结构数据
  getShopsTree(params) {
    return this.post(`/mock/26/pms/base/getShopsTree`, params)
  }
  // 合同编号
  contractsList = (params) => {
    return this.post(`/mock/26/pms/base/contractsList`, params)
  }
  // 审批
  examine(params) {
    return this.post(`/mock/26/pms/examine`, params)
  }

  // 获取审批列表
  queryExamine(params) {
    return this.post(`/mock/26/pms/queryExamine`, params)
  }
  // 费项列表
  feeList = (params) => {
    return this.post(`/mock/26/pms/base/feeList`, params)
  }

  // 费项的可用余额和可抵充
  balance = (params) => {
    return this.post(`/mock/26/pms/base/balance`, params)
  }
  // 转入合同列表
  contNolist = (params) => {
    return this.post(`/mock/26/pms/base/contNolist`, params)
  }
  // 冲抵明细/应收
  detailsList = (params) => {
    return this.post(`/mock/26/pms/base/detailsList`, params)
  }
  // 商铺基本信息
  shopBaseInfo(params) {
    return this.post(`/mock/26/pms/base/shopBaseInfo`, params)
  }
  // 写字楼单元基本信息
  officesBaseInfo(params) {
    return this.post(`/mock/26/pms/base/officesBaseInfo`, params)
  }
  // 商家名称查询
  shopNameQuery=(params) => {
    return this.post(`/mock/26/pms/shopName/query`, params)
  }
}

export const baseApi = new BaseApi()
