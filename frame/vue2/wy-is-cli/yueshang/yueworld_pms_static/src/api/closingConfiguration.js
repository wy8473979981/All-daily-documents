/*
 * @Author: xza
 * @LastEditors: Please set LastEditors
 * @Description: api接口示例
 * @Description: 财务管理-关账配置
 */
import { Api } from '@/utils/api'

export class ClosingConfigurationApi extends Api {
  // 列表
  closingConfigurationList = (param) => {
    return this.post(`/mock/26/pms/FinancialManagement/ClosingConfiguration/list`, param)
  }
  // 新增
  closingConfigurationAddList = (param) => {
    return this.post('/mock/26/pms/FinancialManagement/ClosingConfigurationAdd/list', param)
  }
  // 保存
  closingConfigurationAddSave = (param) => {
    return this.post('/mock/26/pms/FinancialManagement/ClosingConfigurationAdd/save', param)
  }
  // 删除
  cashflowModuleDelete = (param) => {
    return this.post('/mock/26/pms/FinancialManagement/CashflowModuleList/delete', param)
  }
}

export const closingConfigurationApi = new ClosingConfigurationApi()
