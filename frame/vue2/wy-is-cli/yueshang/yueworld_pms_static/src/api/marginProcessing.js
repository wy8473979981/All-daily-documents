/*
 * @Author: xiaoxie
 * @Date: 2021-07-19 12:12:04
 * @Last Modified by: xiaoxie
 * @Last Modified time: 2021-07-27 13:56:23
 */
import { Api } from '@/utils/api'
export class MarginProcessingApi extends Api {
  // 获取保证金处理单
  marginProcessingList = (param) => {
    return this.post('/mock/26/pms/FinancialManagement/MarginProcessingList/list', param)
  }
  // 保证金处理单删除
  deleteMarginProcessing = (param) => {
    return this.post('/mock/26/pms//FinancialManagement/MarginProcessingList/delete', param)
  }
  // 保证金-保证金-处理单详情
  marginProcessingDetail = (param) => {
    return this.post('/mock/26/pms/FinancialManagement/MarginProcessing/detail', param)
  }
  // 保证金-保证金-处理单-保存、审核
  saveMarginProcessing = (param) => {
    return this.post('/mock/26/pms/FinancialManagement/saveMarginProcessing', param)
  }
  // 保证金余额列表
  marginBalanceList = (param) => {
    return this.post('/mock/26/pms/FinancialManagement/MarginBalanceList/list', param)
  }
  // 保证金余额列表
  marginBalanceDetail = (param) => {
    return this.post('/mock/26/pms/FinancialManagement/MarginBalanceDetail/list', param)
  }
  // 财务管理-凭证管理-凭证池-自定义字段
  certificatePoolList = (param) => {
    return this.post('/mock/26/pms/FinancialManagement/CertificatePool/list', param)
  }
  // 财务管理-凭证管理-凭证汇总
  voucherSummaryList = (param) => {
    return this.post('/mock/26/pms/FinancialManagement/VoucherSummary/list', param)
  }
  // 删除财务管理-凭证管理-凭证汇总
  deleteVoucherSummary = (param) => {
    return this.post('/mock/26/pms/FinancialManagement/VoucherSummary/delete', param)
  }
  // 财务管理-凭证管理-凭证汇总详情
  voucherSummaryDetail = (param) => {
    return this.post('/mock/26/pms/FinancialManagement/VoucherSummaryDetail/detail', param)
  }
  // 财务管理-凭证管理-凭证模板
  voucherTemplateslist = (param) => {
    return this.post('/mock/26/pms/FinancialManagement/VoucherTemplateslist', param)
  }
}
export const marginProcessingApi = new MarginProcessingApi()
