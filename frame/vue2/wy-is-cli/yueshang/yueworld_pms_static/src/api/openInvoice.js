/*
 * @Author: zyq
 * @LastEditors: AGENT
 * @Description: api接口示例
 * @Description: 基础数据
 */
import { Api } from '@/utils/api'
export class MeterApi extends Api {
  // 获取开票列表
  groupList = (param) => {
    return this.post(`/mock/26/pms/FinancialManagement/openInvoic/list`, param)
  }
  // 获取费翔列表
  feeList = (param) => {
    return this.post(`/mock/26/pms/FinancialManagement/openInvoic/feelist`, param)
  }
  // 费翔关系 保存
  feeSave = (param) => {
    return this.post(`/mock/26/pms/FinancialManagement/costBetween/save`, param)
  }
}

export const meterApi = new MeterApi()
