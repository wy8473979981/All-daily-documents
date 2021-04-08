import { http } from './http'

// 放款列表信息汇总
export function getBackendLoanRecordTotal() {
  return http().post('/backend/loan/getBackendLoanRecordTotal', {})
}

// excel导出
export function batchExportLoan(data: any) {
  return http().post('/backend/loan/batchExportLoan', data, { responseType: 'blob' })
}
