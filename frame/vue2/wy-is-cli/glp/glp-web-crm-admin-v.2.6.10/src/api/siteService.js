import { get, post } from './axiosConfig';
export default {

  // 地址- 批量删除、删除 
  deleteSite: (data, header) => post('/glp-crm/customer/address/deleteByIds', data, header),

  // 地址- 新增
  createSite: (data, header) => post('/glp-crm/customer/address/create', data, header),

  // 地址- 详情
  siteDetailById: (id, header) => get(`/glp-crm/customer/address/detail/${id}`, header),

  // 地址- 更新
  updateSite: (data, header) => post(`/glp-crm/customer/address/update`, data, header),

  post: (url, data, header) => post(url, data, header),
  get: (url, header) => get(url, header)
}