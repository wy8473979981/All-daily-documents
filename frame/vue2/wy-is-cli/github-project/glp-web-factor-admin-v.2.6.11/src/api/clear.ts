import { http } from './http'

export function loadDetail(params: any) {
  return http().post('/backend/distribution/page', params)
}

// 清分试算
export function simulate(data: any) {
  return http().post('/backend/distribution/simulate', data)
}

// 清分申请
export function apply(data: any) {
  return http().post('/backend/distribution/apply', data)
}

// 清分页面-融资申请单查询
export function getOrders(data: any) {
  return http().post('/backend/distribution/order', data)
}

// 余额拨付记录导出
export function exportRefund(data: any) {
  return http().post('/backend/refund/excel', data, { responseType: 'blob' })
}

// 获取拨付记录
export function refundRecord(data: any) {
  return http().post('/backend/refund/record', data)
}
