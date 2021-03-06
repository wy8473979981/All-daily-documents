import { get, post } from './axiosConfig';
export default {
  // 客户 - 客户筛选
  getConsumerType: (header) => get(`/glp-crm/customer/conditionInfo`, header),

  // 客户 - 新增
  createConsumer: (data, header) => post('/glp-crm/customer/create', data, header),

  // 客户 - 编辑
  updateConsumer: (data, header) => post('/glp-crm/customer/update', data, header),

  // 客户 - 删除
  deleteConsumerById: (data, header) => post(`/glp-crm/customer/del`, data, header),

  // 客户 - 领用
  batchReceiveConsumer: (data, header) => post(`/glp-crm/customer/claim`, data, header),

  // 客户 - 批转让
  batchTransferConsumer: (data, header) => post(`/glp-crm/customer/transfer`, data, header),

  // 客户 - 释放
  batchReleaseConsumer: (data, header) => post(`/glp-crm/customer/release`, data, header),

  // 客户 - 详情
  consumerDetailById: (id, header) => get(`/glp-crm/customer/info/${id}`, header),


  // 客户 - 根据当前登录用户获取公海信息
  getLiberumByCurrentUser: (id, header) => get(`/glp-crm/customer/poolInfo`, header),

  // 客户 - 详情 - 客户附件 - 新建
  consumerFilesUploadCreate: (data, header) => post(`/glp-crm/material/create`, data, header),

  // 客户 - 详情 - 客户附件  - 修改
  consumerFilesUploadUpdate: (data, header) => post(`/glp-crm/material/update`, data, header),

  // 客户 - 详情 - 客户附件  - 修改
  consumerFilesUploadDetele: (id, header) => get(`/glp-crm/material/deleteMaterial/${id}`, header),

  // 客户 - 详情 - 客户附件  - 详情
  consumerFilesUploadDetail: (id, header) => get(`/glp-crm/material/detail/${id}`, header),


  // 用户维度客户批量转让-批量转让客户
  consumerBatchTransfer: (data, header) => post(`/glp-crm/customer/transfer/user`, data, header),


  // 客户 - 详情 - 已授信贷款信息  - 授信信息
  consumerCredit: (id, header) => get(`/glp-crm/customer/dc/info/credit/${id}`, header),

  // 客户 - 详情 - 已授信贷款信息  - 用信信息
  consumerCreditUse: (id, header) => get(`/glp-crm/customer/dc/info/creditUse/${id}`, header),

  // 客户 - 详情 - 已授信贷款信息  - 逾期信息
  consumerOverdue: (id, header) => get(`/glp-crm/customer/dc/info/overdue/${id}`, header),

  // 客户 - 详情 - 已授信贷款信息  - 担保人信息
  consumerGuarantee: (id, header) => get(`/glp-crm/customer/dc/info/guarantee/${id}`, header),


  post: (url, data, header) => post(url, data, header),
  get: (url, header) => get(url, header)
}