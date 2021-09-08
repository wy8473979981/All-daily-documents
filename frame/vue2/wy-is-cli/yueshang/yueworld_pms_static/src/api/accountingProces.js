/*
 * @Author: xza
 * @LastEditors: xza
 * @Description: api接口示例
 * @Description: 财务管理-辅助核算
 */
import { Api } from '@/utils/api'

export class AccountingProcesApi extends Api {
  // 列表
  accountingProcesList = (param) => {
    return this.post(`/mock/26/pms/FinancialManagement/AccountingProces/list`, param)
  }
  // 新增
  accountingProcesCreate = (param) => {
    return this.post('/mock/26/pms/FinancialManagement/openInvoic/Create', param)
  }
  // 编辑
  accountingProcesEdit = (param) => {
    return this.post('/mock/26/pms/FinancialManagement/AccountingProces/Edit', param)
  }
  // 删除
  accountingProcesDelete = (param) => {
    return this.post('/mock/26/pms/FinancialManagement/openInvoic/Delete', param)
  }
}

export const accountingProcesApi = new AccountingProcesApi()
