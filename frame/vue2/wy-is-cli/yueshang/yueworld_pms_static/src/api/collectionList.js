/*
 * @Author: fzx
 * @LastEditors: fzx
 * @Description: 财务管理-收款管理-收款单接口
 */
import { Api } from '@/utils/api'

export class CollectionList extends Api {
    // 获取 核销单列表
    verificationList = (param) => {
      return this.post('/mock/26/pms/FinancialManagement/verificationList/list', param)
    }
    // 获取 核销单-编辑
    verificationAdd = (param) => {
      return this.post('/mock/26/pms/FinancialManagement/verificationAdd/list', param)
    }
    // 获取 核销单-详情
    verificationDetails = (param) => {
      return this.post('/mock/26/pms/FinancialManagement/verificationDetails/list', param)
    }
    // 获取 核销配置列表
    collectionConfig = (param) => {
      return this.post('/mock/26/pms/FinancialManagement/collectionConfig/list', param)
    }
    // 获取 收款单列表
    collectionList = (param) => {
      return this.post('/mock/26/pms/FinancialManagement/collectionList/list', param)
    }
    // 获取 收款单详情
    collectionListDetails = (param) => {
      return this.post('/mock/26/pms/FinancialManagement/collectionListDetails/list', param)
    }
    // 获取 收款单编辑
    collectionListEdit = (param) => {
      return this.post('/mock/26/pms/FinancialManagement/collectionListEdit/list', param)
    }
    // 获取 收款单 核销页
    collectionVerificationForm = (param) => {
      return this.post('/mock/26/pms/FinancialManagement/collectionVerificationForm/list', param)
    }
    // 获取 收款单 核销页-应收冲减弹窗
    dialogFormAdd = (param) => {
      return this.post('/mock/26/pms/FinancialManagement/dialogFormAdd/list', param)
    }
    // 获取 收款单 核销页-核销明细弹窗
    offsetDialo = (param) => {
      return this.post('/mock/26/pms/FinancialManagement/offsetDialo/list', param)
    }
    // 获取 收款单 核销页-选择商家弹窗
    selectBusiness = (param) => {
      return this.post('/mock/26/pms/FinancialManagement/selectBusiness/list', param)
    }
    // 获取 核销配置-新增
    collectionConfigAdd = (param) => {
      return this.post('/mock/26/pms/FinancialManagement/collectionConfigAdd/list', param)
    }
    // 获取 应收管理-费用调整单-新增-合同编号弹窗
    contNoChange = (param) => {
      return this.post('/mock/26/pms/FinancialManagement/contNoChange/list', param)
    }
    // 获取 应收管理-费用调整单-编辑
    adjustmentCostAdd = (param) => {
      return this.post('/mock/26/pms/FinancialManagement/adjustmentCostAdd/list', param)
    }
}

export const collectionList = new CollectionList()
