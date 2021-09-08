/*
 * @Author: xza
 * @LastEditors: xza
 * @Description: api接口示例
 * @Description: 财务管理-税率
 */
import { Api } from '@/utils/api'

export class TaxModuleListApi extends Api {
  // 列表
  taxModuleList = (param) => {
    return this.post(`/mock/26/pms/FinancialManagement/TaxModuleList/list`, param)
  }
  // 新增
  taxModuleCreate = (param) => {
    return this.post('/mock/26/pms/FinancialManagement/TaxModuleList/create', param)
  }
  // 编辑
  taxModuleEdit = (param) => {
    return this.post('/mock/26/pms/FinancialManagement/TaxModuleList/edit', param)
  }
  // 删除
  taxModuleDelete = (param) => {
    return this.post('/mock/26/pms/FinancialManagement/TaxModuleList/delete', param)
  }
  // 科目关系
  taxModuleSubject = (param) => {
    return this.post('/mock/26/pms/FinancialManagement/TaxModuleList/sublist', param)
  }
  // 科目关系保存
  taxModuleSubjectSave = (param) => {
    return this.post('/mock/26/pms/FinancialManagement/taxModuleSubject/save', param)
  }
  // 费项关系
  taxModuleFee = (param) => {
    return this.post('/mock/26/pms/FinancialManagement/TaxModuleList/feelist', param)
  }
  // 费项关系保存
  taxModuleFeeSave = (param) => {
    return this.post('/mock/26/pms/FinancialManagement/taxModuleFee/save', param)
  }
}

export const taxModuleListApi = new TaxModuleListApi()
