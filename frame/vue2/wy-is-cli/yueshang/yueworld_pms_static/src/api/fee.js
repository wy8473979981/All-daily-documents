/*
 * @Author: xza
 * @LastEditors: xza
 * @Description: api接口示例
 * @Description: 财务管理-费用项
 */
import { Api } from '@/utils/api'

export class FeeApi extends Api {
  // 列表
  feeList = (param) => {
    return this.post(`/mock/26/pms/FinancialManagement/fee/list`, param)
  }
  // 新增
  feeCreate = (param) => {
    return this.post('/mock/26/pms/FinancialManagement/fee/create', param)
  }
  // 编辑
  feeEdit = (param) => {
    return this.post('/mock/26/pms/FinancialManagement/fee/edit', param)
  }
  // 删除
  feeDelete = (param) => {
    return this.post('/mock/26/pms/FinancialManagement/fee/delete', param)
  }
  // 科目关系列表
  SubjectRelationList = (param) => {
    return this.post(`/mock/26/pms/FinancialManagement/SubjectRelation/list`, param)
  }
  // 科目关系删除
  SubjectRelationDelete = (param) => {
    return this.post(`/mock/26/pms/FinancialManagement/SubjectRelation/list`, param)
  }
  // 科目关系新增
  SubjectRelationCreate = (param) => {
    return this.post(`/mock/26/pms/FinancialManagement/SubjectRelation/create`, param)
  }
  // 科目关系编辑
  SubjectRelationEdit = (param) => {
    return this.post(`/mock/26/pms/FinancialManagement/SubjectRelation/edit`, param)
  }
}

export const feeApi = new FeeApi()
