import { http } from './http'

// 普链保 客户信息编辑保存
export function submitForm (params: any) {
  return http().post('/clientend/updateCustomerInformation', params)
}

// 普链保 查询客户联系人信息
export function getBaseCustomerInfo (params: any) {
  return http().get(`/clientend/customerInformation?customerId=${params.customerId}`)
}

// 普链保 提交增加的文件
export function submitAddFiled (params: any) {
  return http().post('/clientend/amount/addCustomer', params)
}

// 普链保 查询文件列表
export function queryFileList (id: any) {
  return http().post(`/clientend/invoice/getRepaymentInfoAndPlan?orderId=${id}`)
}
// 普链保 提交增加的文件列表
export function submitFileList (params: any) {
  return http().post('/clientend/amount/addCustomer', params)
}

// 普链保 提交增加的文件列表
export function deleteFileList (params: any) {
  return http().post('/clientend/amount/addCustomer', params)
}

// 普链保 合同列表
export function queryContractList (params: any) {
  return http().post('/clientend/amount/addCustomer', params)
}

// 普链保 拒绝签署合同
export function refuseRequest (params: any) {
  return http().post('/clientend/amount/addCustomer', params)
}

// 普链保 去签署合同
export function decidedRequire (params: any) {
  return http().post('/clientend/amount/addCustomer', params)
}
