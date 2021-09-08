/*
 * @Author: chenkeju9933
 * @LastEditors: chenkeju9933
 * @Description: api接口示例
 * @Description: 财务管理 - 应收管理 - 费用调整单接口
 */
import { Api } from '@/utils/api'

export class AdjustmentCost extends Api {
  // 费用调整单 主列表
  adjustmentCostList = (param) => {
    return this.post(`/mock/26/pms/ReceivableManagement/adjustmentCost/list`, param)
  }
  // 新增
  adjustmentCostCreate = (param) => {
    return this.post('/mock/26/pms/ReceivableManagement/adjustmentCost/create', param)
  }
  // 编辑
  adjustmentCostEdit = (param) => {
    return this.post('/mock/26/pms/ReceivableManagement/adjustmentCost/edit', param)
  }
  // 删除
  adjustmentCostDelete = (param) => {
    return this.post('/mock/26/pms/ReceivableManagement/adjustmentCost/delete', param)
  }
  // 费用调整单详情
  getAdjustmentCostDetail=(param) => {
    return this.post('/mock/26/pms/ReceivableManagement/adjustmentCost/detail', param)
  }
}

export const adjustmentCost = new AdjustmentCost()
