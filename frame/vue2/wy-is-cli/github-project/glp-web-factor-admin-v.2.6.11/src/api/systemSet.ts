import { project } from './../config/workflow/options'
import { http } from './http'

// 异常日列表数据删除
export function delDataErr (id: string) {
  return http().post('/backend/base/calendar/' + id)
}

// 异常日添加
export function addErrDate (params: any) {
  return http().post('/backend/base/calendar/add', params)
}

// 通知规则管理列表查询
export function queryNoteRuleList (params: any) {
  return http().post('/backend/base/notice-rule/', params)
}

// 通知规则设置
export function setNoteRule (params: any) {
  return http().post('/backend/base/notice-rule/edit', params)
}

// 通知信息查询
export function queryNoticeInfoList (params: any) {
  return http().post('/backend/base/notice-list/', params)
}

// 通知信息重发
export function resendNotice (params: any) {
  return http().post('/backend/base/notice-list/send' + params)
}

// 代理人附件信息删除
export function delAgent (id: any) {
  return http().get(`/backend/amount/deleteCustomerProxy?id=${id}`)
}

// 代理人附件信息删除
export function forbiddenAgent (id: any, enabled: any) {
  return http().get(`/backend/amount/enableDisableCustomerProxy?id=${id}&enabled=${enabled}`)
}

// 客户管理-编辑查询客户附件信息
export function queryAgent (params: any) {
  return http().post('/backend/customer/list/agent', params)
}

// 启用禁用监管账户
export function frozenAccount (params: any) {
  return http().post('/backend/bank/supervisor/enable', params)
}

// 提交增加的账户
export function submitAddCustomer (params: any) {
  return http().post('/backend/amount/addCustomer', params)
}

// 账号管理-提交增加的账户
export function submitAddAccount (params: any) {
  return http().post('/backend/addAccount', params)
}

// 账号管理-提交增加的账户
export function submitRelevanceCustomer (params: any) {
  return http().post('/backend/relevanceCustomer', params)
}

// 账号管理-提交增加的账户
export function submitRelevanceProject (params: any) {
  return http().post('/backend/relevanceProject', params)
}

// 新增实体账户
export function addActualAccount (params: any) {
  return http().post('/backend/customer/bank/actual/' + params)
}

// 登录实名
export function loginRealName (params: any) {
  return http().post('/backend/customer/loginRealName', params)
}

// 发起实名
export function sendRealName (params: any) {
  return http().post('/backend/customer/sendRealName?id=' + params)
}

// 待办事项-获取审批列表
export function getApprovalList (params: any) {
  return http().post('/backend/todo/approval/list', params)
}

// 待办事项-获取已完成列表
export function getDoneList (params: any) {
  return http().post('/backend/todo/approval/list', params)
}

// 客户管理-企业详情
export function getAccessBusinessDetails (params: any) {
  return http().post('/backend/amount/accessBusinessDetails', params)
}

// 客户管理-个人详情
export function getAccessPersonalDetails (params: any) {
  return http().post('/backend/amount/accessPersonalDetailsController', params)
}

// 提交增加的文件
export function submitAddFiled (params: any) {
  return http().post('/api/amount/addCustomer', params)
}

// 上传文件
export function getUpload (params: any) {
  return http().post('/api/amount/addCustomer', params)
}

// 获取远程客户名称
export function getRemoteCustomerName (params: any) {
  return http().post('/backend/customer/query/name', params)
}

// /backend/amount/queryEcifByCustomerProxy
export function queryEcifByCustomerProxy (params: any) {
  return http().post('/api/customer/query/private/name', params)
}
// 获取远程主体类型
// export function getRemoteMainType (params: any) {
//   return http().post('/backend/customer/query/name', params)
// }

// 第三方新增账户列表新增
export function addThirdReal (params: any) {
  return http().post('/backend/bank/third/insert', params)
}

// 运营端第三方账户编辑
export function editThirdReal (params: any) {
  return http().post('/backend/bank/third/edit', params)
}

// 非第三方新增账户列表新增
export function addReal (params: any) {
  return http().post('/backend/bank/beneficiary/insert', params)
}

// 非第三方编辑账户
export function editReal (params: any) {
  return http().post('/backend/bank/beneficiary/edit', params)
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

// 更新企业信息
export function updateBusinessDetails (data: any) {
  return http().post('/backend/amount/updateBusinessDetails', data)
}

// 更新个人信息
export function updatePersonalDetails (data: any) {
  return http().post('/backend/amount/updatePersonalDetails', data)
}

// 查询代理人
export function queryCustomerProxy (params: any) {
  return http().get(`/backend/amount/queryCustomerProxy?id=${params}`)
}

// 保存代理人
export function saveCustomerProxy (params: any) {
  return http().post('/backend/amount/saveCustomerProxy', params)
}

// 更新代理人
export function updateCustomerProxy (params: any) {
  return http().post('/backend/amount/updateCustomerProxy', params)
}

// 获取第三方详情支行
export function getThirdReal (id: any) {
  return http().post('/backend/bank/third/detail?id=' + id)
}

// 获取第三方详情支行
export function getThirdRealDetail (processId: any) {
  return http().post('/backend/bank/third/detail?processId=' + processId)
}

// 获取非第三方详情支行
export function getNoThirdReal (id: any) {
  return http().post('/backend/bank/beneficiary/detail?id=' + id)
}

// 回显编辑非第三方实户
export function editNoThirdReal (id: any) {
  return http().post('/backend/bank/beneficiary/detail?id=' + id)
}

// 运营端监管账户合作账号筛选信息
export function getSupervisorSelect (params: any) {
  return http().get('/backend/bank/supervisor/select?bankType=' + params)
}

// 运营端监管账户新增虚户
export function addSupervisorVirtual (params: any) {
  return http().post('/backend/bank/supervisor/virtual/insert', params)
}

// 运营端监管账户新增实户
export function addSupervisorReal (params: any) {
  return http().post('/backend/bank/supervisor/real/insert', params)
}

// 运营端监管账户实户E账户选择的查询(
export function queryAccountAndChoose (params: any) {
  return http().post('/backend/bank/supervisor/open/query', params)
}

// 运营端监管账户编辑虚户
export function editSupervisorVirtual (params: any) {
  return http().post('/backend/bank/supervisor/edit', params)
}

// 运营端监管账户编辑实户
export function editSupervisorReal (params: any) {
  return http().post('/backend/bank/supervisor/edit', params)
}

// 运营端监管账户获取详情(
export function getVirtualData (id: any) {
  return http().post('/backend/bank/supervisor/detail?id=' + id)
}

// 项目初始化
export function initNewProjectInfo (id: any) {
  return http().post('/backend/project/initNewProjectInfo', { quotaCode: id })
}

// 审核项目
export function approverProject (data: any) {
  return http().post('/backend/project/approverProject', data)
}

// 项目详情
export function getProjectDetail (data: any) {
  return http().post('/backend/project/getProjectDetail', data)
}

//  模糊匹配卖方（下拉框）
export function getSellerLikeByName (fuzzyName: any, projectId: any) {
  return http().post('/backend/buyerSeller/getSellerLikeByName', { customerName: fuzzyName, projectId: projectId })
}

//  查看企业银行账号
export function getCompanySupervisorCard (data: any) {
  return http().post('/backend/project/getCompanySupervisorCard', data)
}

// 提交项目审核
export function addProject (data: any) {
  return http().post('/backend/project/addProject', data)
}

// 获取远程项目名称
export function getRemoteProjectName (data: any) {
  return http().post('/backend/project/getProjectNameByLike', data)
}

// 风控审核第三方
export function bankThirdCheck (params: any) {
  return http().post('/backend/bank/third/check', params)
}

// 更新项目
export function updateProject (data: any) {
  return http().post('/backend/project/updateProject', data)
}

// 银行账户收款账户列表
export function getBankActualList (params: any) {
  return http().post('/backend/bank/beneficiary/list', params)
}

// 买卖方关系柯利列表
export function getRelationList (params: any) {
  return http().post('/backend/buyerSeller/kl/list', params)
}

// 获取卖方企业账户名称
export function getReturnAccountList (params: any) {
  return http().post('/backend/project/getCompanySupervisorCard', params)
}

// 添加 买卖方关系
export function addBuyerSeller (params: any) {
  return http().post('/backend/buyerSeller/insert', params)
}

// 更新 买卖方关系
export function editBuyerSeller (params: any) {
  return http().post('/backend/buyerSeller/edit', params)
}

// 详情
export function detailBuyerSeller (params: any) {
  return http().post('/backend/buyerSeller/detail', params)
}

// 详情
export function relationCheck (params: any) {
  return http().post('/backend/buyerSeller/approve', params)
}

// 买卖方关系开通关闭
export function openRelation (params: any) {
  return http().post('/backend/buyerSeller/status/update', params)
}

// 内部员工模糊查询
export function getRemoteAccountName (params: any) {
  return http().post('/backend/queryByUserName?name=' + params)
}

//
export function getContractList (params: any) {
  return http().post('/backend/buyerSeller/getProjectContractList' + params)
}

// 查询合同模块类别
export function getCategoryAll () {
  return http().get('/backend/contractTemplate/getCategoryAll')
}

// 根据合同模块类别id查询合同类型以及模板
export function getInfoByCategoryId (categoryId: any, quotaCode: any) {
  return http().post(`/backend/buyerSeller/initNewProjectContract?categoryId=${categoryId}&quotaCode=${quotaCode}`)
}
