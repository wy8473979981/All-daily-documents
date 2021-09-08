/*
 * @Author: zyq
 * @LastEditors: AGENT
 * @Description: api接口示例
 * @Description: 基础数据
 */
import { Api } from '@/utils/api'
export class MeterApi extends Api {
  // 费翔关系 保存
  feeSave = (param) => {
    return this.post(`/mock/26/pms/FinancialManagement/VoucherTemplatesAdd/save`, param)
  }
  details = (param) => {
    return this.post(`/mock/26/pms/FinancialManagement/VoucherTemplatesAdd/details`, param)
  }
  delete = (param) => {
    return this.post(`/mock/26/pms/FinancialManagement/VoucherTemplatesAdd/delete`, param)
  }
}

export const meterApi = new MeterApi()
