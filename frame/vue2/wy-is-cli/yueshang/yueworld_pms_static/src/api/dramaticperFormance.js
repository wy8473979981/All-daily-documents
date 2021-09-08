/*
 * @Author: xza
 * @LastEditors: xza
 * @Description: api接口示例
 * @Description: 滞纳金
 */
import { Api } from '@/utils/api'

export class DramaticperFormanceApi extends Api {
  // 列表
  dramaticperFormanceList = (param) => {
    return this.post(`/mock/26/pms/FinancialManagement/DramaticperFormance/list`, param)
  }
  // 保存
  dramaticperFormanceSave = (param) => {
    return this.post('/mock/26/pms/FinancialManagement/DramaticperFormance/save', param)
  }
//   // 编辑
//   accountingProcesEdit = (param) => {
//     return this.post('/mock/26/pms/FinancialManagement/AccountingProces/edit', param)
//   }
//   // 删除
//   accountingProcesDelete = (param) => {
//     return this.post('/mock/26/pms/FinancialManagement/AccountingProces/delete', param)
//   }
}

export const dramaticperFormanceApi = new DramaticperFormanceApi()

