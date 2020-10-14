import { http } from './http'

export function balanceRetuenDetail(params: any) {
  return http().post('/backend/refund/page/refund', params)
}

export function customerAccountList(params: any) {
  return http().post('/backend/bank/supervisor/list', params)
}

// 获取银行账户列表
export function beneficiaryList(data: any) {
  return http().post('/backend/bank/beneficiary/list', data)
}

// 拨付申请加载，清分跳转
export function distributionDetail(data: any) {
  return http().post('/backend/refund/page/distribution', data)
}

// 拨付申请加载，工单跳转
export function distributionAuditDetail(data: any) {
  return http().post('/backend/refund/page/form', data)
}

// 拨付申请加载，回款流水列表加载
export function repaymentDistributionAuditDetail(data: any) {
  return http().post('/backend/refund/page/repayment', data)
}

// 拨付申请
export function apply(data: any) {
  return http().post('/backend/refund/apply', data)
}

// 拨付审批
export function examine(data: any) {
  return http().post('/backend/refund/examine', data)
}

// 银行流水同步
export function syncSingleAcctRepaymentWater(data: any) {
  return http().post('/backend/repayment/syncSingleAcctRepaymentWater?repaymentAccountBalanceId=' + data, {})
}

// 银行流水导出
export function exportBackRepaymentWater(data: any) {
  return http().post('/backend/repayment/exportBackRepaymentWater', data, { responseType: 'blob' })
}

// 获取回款流水未清分金额
export function getBackSumBalance(data: any) {
  return http().post('/backend/repayment/getBackSumBalance', data)
}

// 根据卖方id查询银行账户信息
export function getCompanySupervisorCard(data: any) {
  return http().post('/backend/refund/bank', data)
}
