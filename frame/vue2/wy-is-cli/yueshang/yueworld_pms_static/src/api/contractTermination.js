/*
 * @Author: wyz
 * @LastEditors: wyz
 * @Description: 合同解约
 */
import { Api } from '@/utils/api'

export class ContractTerminationApi extends Api {
    // 获取合同变更列表
    contractTerminationList = (param) => {
      return this.post('/mock/26/pms/contractTermination/list', param)
    }
    // 合同解约详细数据
    contractTerminationDetail = (param) => {
      return this.post('/mock/26/pms/contractTermination/detail', param)
    }
    // 合同解约删除
    contractTerminationDelete = (param) => {
      return this.post('/mock/26/pms/contractTermination/delete', param)
    }
    // 合同解约财务信息
    contractTerminationFinancialData = (param) => {
      return this.post('/mock/26/pms/contractTermination/financialData', param)
    }
    // 合同解约保存
    contractTerminationSave = (param) => {
      return this.post('/mock/26/pms/contractTermination/save', param)
    }
}

export const contractTerminationApi = new ContractTerminationApi()
