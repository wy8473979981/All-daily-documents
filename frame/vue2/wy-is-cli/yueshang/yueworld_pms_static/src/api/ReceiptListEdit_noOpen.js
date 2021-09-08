/*
 * @Author: zbk
 * @LastEditors: AGENT
 * @Descripttion:收据接口
 */
import { Api } from '@/utils/api'

export class ReceiptListApi extends Api {
  // 获取收据列表
  receiptList = (param) => {
    return this.post(`/mock/26/pms/FinancialManagement/ReceiptListEdit_noOpen/list`, param)
  }
}

export const receiptListApi = new ReceiptListApi()
