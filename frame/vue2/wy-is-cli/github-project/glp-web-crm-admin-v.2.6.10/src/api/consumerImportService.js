import { get, post } from './axiosConfig';
export default {

  // 客户导入
  consumerImportCreate: (data, header) => post(`/glp-crm/intention/import`, data, header),

  post: (url, data, header) => post(url, data, header),
  get: (url, header) => get(url, header)
}