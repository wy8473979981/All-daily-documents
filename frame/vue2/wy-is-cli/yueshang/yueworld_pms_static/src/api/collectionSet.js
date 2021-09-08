/*
 * @Author: chenkeju9933
 * @LastEditors: chenkeju9933
 * @Description: api接口示例
 * @Description: 财务配置-收款配置
 */
import { Api } from '@/utils/api'

export class CollectionSetApi extends Api {
  // 主列表
  collectionSetList = (param) => {
    return this.post(`/mock/26/pms/FinancialManagement/collectionSet/list`, param)
  }
  // 获取费项列表
  feeList = (param) => {
    return this.post(`/mock/26/pms/FinancialManagement/collectionSet/feelist`, param)
  }
  // 保存费项关系
  feeListSave = (param) => {
    return this.post(`/mock/26/pms/FinancialManagement/collectionSetFee/save`, param)
  }
  // 新增
  collectionSetCreate = (param) => {
    return this.post('/mock/26/pms/FinancialManagement/collectionSet/create', param)
  }
  // 编辑
  collectionSetEdit = (param) => {
    return this.post('/mock/26/pms/FinancialManagement/collectionSet/edit', param)
  }
  // 删除
  collectionSetDelete = (param) => {
    return this.post('/mock/26/pms/FinancialManagement/collectionSet/delete', param)
  }
}

export const collectionSetApi = new CollectionSetApi()
