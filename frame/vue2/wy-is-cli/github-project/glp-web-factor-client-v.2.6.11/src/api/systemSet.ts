import { http } from './http'

// 编辑资金到账账户
export function editBeneficiary (params: any) {
  return http().post('/clientend/bank/beneficiary/edit', params)
}

// 新增资金到账账户
export function addBeneficiary (params: any) {
  return http().post('/clientend/bank/beneficiary/insert', params)
}

// 编辑第三方资金到账账户
export function editInformationFundToAccount (params: any) {
  return http().post('/base/information/' + params.id, params)
}

// 登录系统
export function loginSystem (id: any) {
  return http().post('/clientend/customer/readAndAgree?id=' + id)
}

// 获取银行列表
export function getRemoteBankNo () {
  return http().post('/api/bank/list')
}

// 获取省份
export function getRemoteProvince (params: any) {
  return http().post('/api/bank/province/list?bankNo=' + params)
}

// 获取城市
export function getRemoteCity (params: any) {
  return http().post(`/api/bank/city/list?bankNo=${params.bankNo}&provinceCode=${params.provinceCode}`)
}

// 获取支行
export function getRemoteBankBranch (params: any) {
  return http().post(`/api/bank/branch/list?bankNo=${params.bankNo}&provinceCode=${params.provinceCode}&cityCode=${params.cityCode}`)
}

// 放款账户同步法人账户详情
export function getRealname () {
  return http().post('/clientend/bank/beneficiary/realname/law/detail')
}

// 放款账户详情
export function getRealData (id: any) {
  return http().post('/clientend/bank/beneficiary/detail?id=' + id)
}

// 启用账户
export function usingAccount (id: any) {
  return http().post('/clientend/bank/beneficiary/enable?id=' + id)
}

// 第三方放款账户详情
export function getThirdReal (id: any) {
  return http().post('/clientend/bank/third/detail?id=' + id)
}

// 第三方放款账户编辑
export function editThirdReal (params: any) {
  return http().post('/clientend/bank/third/edit', params)
}

// 第三方放款账户详情
export function addThirdReal (params: any) {
  return http().post('/clientend/bank/third/insert', params)
}

// 获取远程客户名称
export function getRemoteCustomerName (params: any) {
  return http().post('/clientend/customer/query/name', params)
}

// 内部员工登录关联客户
export function submitRelevanceCustomer (params: any) {
  return http().post('/clientend/relevanceCustomer', params)
}
