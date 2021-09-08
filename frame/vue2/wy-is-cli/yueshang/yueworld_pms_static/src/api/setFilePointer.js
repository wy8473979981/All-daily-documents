/*
 * @Author: xza
 * @LastEditors: xza
 * @Description: api接口示例
 * @Description: 财务管理-账套
 */
import { Api } from '@/utils/api'

export class SetFilePointerApi extends Api {
  // 列表
  setFilePointerList = (param) => {
    return this.post(`/mock/26/pms/FinancialManagement/account/list`, param)
  }
  // 新增
  setFilePointerCreate = (param) => {
    return this.post('/mock/26/pms/FinancialManagement/account/create', param)
  }
  // 编辑
  setFilePointerEdit = (param) => {
    return this.post('/mock/26/pms/FinancialManagement/account/edit', param)
  }
  // 删除
  setFilePointerDelete = (param) => {
    return this.post('/mock/26/pms/FinancialManagement/account/delete', param)
  }
}

export const setFilePointerApi = new SetFilePointerApi()
