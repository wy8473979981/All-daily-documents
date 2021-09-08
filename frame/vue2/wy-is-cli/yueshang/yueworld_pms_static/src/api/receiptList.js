/*
 * @Author: xza
 * @LastEditors: xza
 * @Descripttion:收据接口
 */
import { Api } from '@/utils/api'

export class ReceiptListApi extends Api {
  // 获取收据列表
  receiptList = (param) => {
    return this.post(`/mock/26/pms/FinancialManagement/receipt/list`, param)
  }
  // 保存
  feeSave = (param) => {
    return this.post(`/mock/26/pms/FinancialManagement/ReceiptListAdd/save`, param)
  }
  // 详情
  receiptListDetails = (param) => {
    return this.post(`/mock/26/pms/FinancialManagement/receipt/details`, param)
  }
  // 弹窗列表
  receiptListWindow = (param) => {
    return this.post(`/mock/26/pms/FinancialManagement/receipt/windowList`, param)
  }
}

export const receiptListApi = new ReceiptListApi()
