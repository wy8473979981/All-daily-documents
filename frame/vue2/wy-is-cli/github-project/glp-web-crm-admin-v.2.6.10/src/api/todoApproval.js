import { get, post } from './axiosConfig';
export default {
  // 业务类型下拉枚举
  templateCodeList: (header) => get(`/glp-crm/share/profit/templateCodeList`, header),

  // 业务审批 - 详情
  todoDetailById: (id, header) => get(`/glp-crm/process/workflow/detail/${id}`, header),

  // 业务审批 - 详情 - 审批记录
  approveRecord: (id, header) => get(`/glp-crm/process/workflow/approveRecord/${id}`, header),

  // 业务审批- 审批
  todoApproval: (data, header) => post(`/glp-crm/process/workflow/approve`, data, header),
  
  // 业务审批- 终止
  termination: (data, header) => post(`/glp-crm/process/workflow/delete`, data, header),

  post: (url, data, header) => post(url, data, header),
  get: (url, header) => get(url, header)
}