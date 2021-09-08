/*
 * @Author: xza
 * @LastEditors: xza
 * @Description: api接口示例
 * @Description: 财务管理-现金流
 */
import { Api } from '@/utils/api'

export class CashflowModuleListApi extends Api {
  // 列表
  cashflowModuleList = (param) => {
    return this.post(`/mock/26/pms/FinancialManagement/CashflowModuleList/list`, param)
  }
  // 新增
  cashflowModuleCreate = (param) => {
    return this.post('/mock/26/pms/FinancialManagement/CashflowModuleList/create', param)
  }
  // 编辑
  cashflowModuleEdit = (param) => {
    return this.post('/mock/26/pms/FinancialManagement/CashflowModuleList/edit', param)
  }
  // 删除
  cashflowModuleDelete = (param) => {
    return this.post('/mock/26/pms/FinancialManagement/CashflowModuleList/delete', param)
  }
}

export const cashflowModuleListApi = new CashflowModuleListApi()
