/*
 * @Author: wyz
 * @LastEditors: wyz
 * @Description: 合同变更
 */
import { Api } from '@/utils/api'

export class ContractChangeApi extends Api {
    // 获取合同变更列表
    contractChangeList = (param) => {
      return this.post('/mock/26/pms/contractChange/list', param)
    }
    // 获取合同变更新增
    contractChangeSave = (param) => {
      return this.post('/mock/26/pms/contractChange/save', param)
    }
    // 获取合同变更甲方信息
    contractChangeFirstPartyDetail = (param) => {
      return this.post('/mock/26/pms/contractChange/firstPartyDetail', param)
    }
    // 获取合同变更商家开票信息
    contractChangeTenantBillingInfo = (param) => {
      return this.post('/mock/26/pms/contractChange/tenantBillingInfo', param)
    }
    // 获取合同变更商家合同信息
    contractChangeTenantContractInfo = (param) => {
      return this.post('/mock/26/pms/contractChange/tenantContractInfo', param)
    }
    // 获取合同变更前后差异详情
    contractChangeDiffDetail = (param) => {
      return this.post('/mock/26/pms/contractChange/diffDetail', param)
    }
    // 获取合同变更前后差异详情
    contractChangeDiffDetailById = (param) => {
      return this.post('/mock/26/pms/contractChange/diffDetailById', param)
    }
    // 获取合同变更前后台账数据
    contractChangeStandingBookList = (param) => {
      return this.post('/mock/26/pms/contractChange/standingBookList', param)
    }
    // 获取合同变更前后审核数据
    contractChangeDiffDetailExamine = (param) => {
      return this.post('/mock/26/pms/contractChange/diffDetailExamine', param)
    }
    // 获取补充条款详情
    contractChangeAdditionTermDetail = (param) => {
      return this.post('/mock/26/pms/contractChange/additionTermDetail', param)
    }
    // 补充条款保存
    contractChangeAdditionTermSave = (param) => {
      return this.post('/mock/26/pms/contractChange/additionTermSave', param)
    }
    // 获取合同应收变更详情
    contractChangeReceivableDetail = (param) => {
      return this.post('/mock/26/pms/contractChange/receivableDetail', param)
    }
    // 合同应收变更保存
    contractChangeReceivableSave = (param) => {
      return this.post('/mock/26/pms/contractChange/receivableSave', param)
    }
}

export const contractChangeApi = new ContractChangeApi()
