import { get, post } from './axiosConfig';
export default {

  // 法定代表及实控人- 批量删除、删除 
  deleteLegalControl: (data, header) => post('/glp-crm/legalCustomer/deleteByIds', data, header),

  // 法定代表及实控人- 新增
  createLegalControl: (data, header) => post('/glp-crm/legalCustomer/create', data, header),

  // 法定代表及实控人- 详情
  legalControlDetailById: (id, header) => get(`/glp-crm/legalCustomer/detail/${id}`, header),

  // 法定代表及实控人- 更新
  updateLegalControl: (data, header) => post(`/glp-crm/legalCustomer/update`, data, header),

  post: (url, data, header) => post(url, data, header),
  get: (url, header) => get(url, header)
}