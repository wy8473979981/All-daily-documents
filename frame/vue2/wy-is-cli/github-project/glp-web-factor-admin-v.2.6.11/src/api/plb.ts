import { http } from './http'
export function getCustomerInformation(data: any) {
  return http().post('/backend/operating/getCustomerInformation', data)
}
