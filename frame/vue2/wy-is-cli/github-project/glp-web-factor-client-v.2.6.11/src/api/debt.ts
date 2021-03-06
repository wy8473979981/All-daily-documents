import { http } from './http'

// 导出基础债权列表
export function exportBaseClaimList(data: any) {
  return http().post('/clientend/claim/exportBaseClaimList', data, { responseType: 'blob' })
}

// 基础债权详情
export function queryClaimDetail(data: any) {
  return http().get(`/clientend/claim/queryClaimDetail/${data}`)
}
