
import { http } from './http'

export function getInvoiceSum(data: any) {
  return http().post('/backend/invoicing/getInvoiceSum', data)
}

// 红冲发票
export function redDashedInvoice(data: any) {
  return http().post('/backend/invoicing/redDashedInvoice', data)
}

// 开新正票
export function afreshInvoice(data: any) {
  return http().post('/backend/invoicing/afreshInvoice', data)
}

// 下载单张发票
export function downloadInvoice(data: any) {
  return http().post('/backend/invoicing/downloadInvoice', data)
}

// 批量下载发票
export function batchExportInvoice(data: any) {
  return http().post('/backend/invoicing/batchExportInvoice', data, { responseType: 'blob' })
}

// 查询该结算单对应的发票号码
export function queryInvoiceBySettlement(data: any) {
  return http().post('/backend/invoicing/queryInvoiceBySettlement', data)
}
