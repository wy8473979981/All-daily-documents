/*
 * @Author: xza
 * @LastEditors: xza
 * @Description: api接口示例
 * @Description: 财务管理-会计科目
 */
import { Api } from '@/utils/api'

export class AccountingSubjectApi extends Api {
  // 列表
  accountingList = (param) => {
    return this.post(`/mock/26/pms/FinancialManagement/AccountingSubject/list`, param)
  }
  // 新增
  accountingCreate = (param) => {
    return this.post('/mock/26/pms/FinancialManagement/AccountingSubject/create', param)
  }
  // 编辑
  accountingEdit = (param) => {
    return this.post('/mock/26/pms/FinancialManagement/AccountingSubject/edit', param)
  }
  // 删除
  accountingDelete = (param) => {
    return this.post('/mock/26/pms/FinancialManagement/AccountingSubject/delete', param)
  }
}

export const accountingSubjectApi = new AccountingSubjectApi()
