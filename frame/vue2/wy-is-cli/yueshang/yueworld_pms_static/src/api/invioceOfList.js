/*
 * @Author: xueyx
 * @LastEditors: xueyx
 * @Descripttion:发票接口
 */
import { Api } from '@/utils/api'

export class InvoiceOfListApi extends Api {
  // 获取发票列表
  invoiceOfList = (param) => {
    return this.post(`/mock/26/pms/FinancialManagement/invioce/list`, param)
  }
  // 获取发票详情
  invoiceOfListDetail = (param) => {
    return this.post(`/mock/26/pms/FinancialManagement/invioce/detail`, param)
  }
  // 发票明细
  detailList = (param) => {
    return this.post(`/mock/26/pms/FinancialManagement/invioce/detailList`, param)
  }
  // 开票范围
  dialogList = (param) => {
    return this.post(`/mock/26/pms/FinancialManagement/invioce/dialogList`, param)
  }
   // 获取发票配置列表
   invoiceBreakConfigList = (param) => {
     return this.post(`/mock/26/pms/FinancialManagement/invioceBreakConfig/list`, param)
   }
  // 获取发票配置详情
  invoiceBreakConfigDetail = (param) => {
    return this.post(`/mock/26/pms/FinancialManagement/invioceBreakConfig/detail`, param)
  }
}

export const invoiceOfListApi = new InvoiceOfListApi()
