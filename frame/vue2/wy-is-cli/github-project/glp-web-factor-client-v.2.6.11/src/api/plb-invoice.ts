import { http } from './http'

export function upInvoiceInfo(data: any) {
  return http().post('/clientend/invoice/upInvoiceInfo', data)
}

export function getInvoiceOrderUpStatus(params: any) {
  return http().post(`/clientend/invoice/getInvoiceOrderUpStatus?orderId=${params}`)
}

export function saveInvoiceInfo(data: any) {
  return http().post('/clientend/invoice/saveInvoiceInfo', data)
}

// 发票提交
export function submitInvoiceInfo(data: any) {
  return http().post(`/clientend/invoice/submitInvoiceInfo?orderId=${data}`, {})
}

// 发票批量查验
export function validInvoiceInfo(data: any) {
  return http().post(`/clientend/invoice/validInvoiceInfo?orderId=${data}`, {})
}

// 获取第一步数据
export function oneStep(data: any) {
  return http().post('/clientend/NegotiablePaper/oneStep', data)
}

// ============================新接口联调==============================
// step0 我要融资(我要融资得到订单ID), 返回成功，打开step1详情页
export function insertAddition() {
  return http().post('/clientend/plb/step0/insertAddition', {})
}

// step1 excel导入 普链保票据导入
export function upPaperFile(data: any) {
  return http().post('/clientend/plb/step2/erFile', data)
}

// 下一步通知服务端
export function addStep(data: any) {
  return http().get(`/clientend/plb/step/addStep?orderId=${data}`, {})
}

// 上一步通知服务端
export function reduceStep(data: any) {
  return http().get(`/clientend/plb/step/reduceStep?orderId=${data}`, data)
}

// 获取可编辑订单当前所在位置
export function stepNum(orderId: any) {
  return http().get(`/clientend/plb/step/detail?orderId=${orderId}`)
}

// 第三步保存数据
export function addStep3(data: any) {
  return http().post('/clientend/plb/step3/addStep', data)
}

// 第四步信息确认
export function invoiceInfoNext(data: any) {
  return http().post(`/clientend/invoice/invoiceInfoNext?orderId=${data}`, {})
}

// 首页按钮展示状态
export function goToFinance() {
  return http().get('/clientend/goToFinance')
}

// 申请开通普联保产品
export function applicationForProductOpening() {
  return http().get('/clientend/applicationForProductOpening')
}
