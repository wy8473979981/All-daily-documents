import { http } from './http'

export function settlementDetail (params: any) {
  return http().post('/backend/settlement/detail', params)
}
