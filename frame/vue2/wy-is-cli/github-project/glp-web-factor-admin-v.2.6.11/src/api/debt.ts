import { http } from './http'

// 导出基础债权列表
export function exportBaseClaimList(data: any) {
  return http().post('/backend/claim/exportBaseClaimList', data, { responseType: 'blob' })
}

// 基础债权详情
export function queryClaimDetail(data: any) {
  return http().get(`/backend/claim/queryClaimDetail/${data}`)
}

// 作废基础债权列表数据
export function invalidBaseClaim(data: any) {
  return http().post('/backend/claim/invalidBaseClaim', data)
}
