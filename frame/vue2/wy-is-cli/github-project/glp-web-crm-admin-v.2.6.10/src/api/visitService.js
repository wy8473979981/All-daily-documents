import { get, post } from './axiosConfig';
export default {

    // 拜访- 批量删除、删除 
    deleteVisit: (data, header) => post('/glp-crm/customer/visit/delete', data, header),

    // 拜访- 新增
    createVisit: (data, header) => post('/glp-crm/customer/visit/create', data, header),

    // 拜访- 详情
    visitDetailById: (id, header) => get(`/glp-crm/customer/visit/detail/${id}`, header),

    // 拜访- 更新
    updateVisit: (data, header) => post(`/glp-crm/customer/visit/update`, data, header),

    // 拜访- 初拜标志
    visitFirstFlag: (id, header) => get(`/glp-crm/customer/visit/firstFlag/${id}`, header),

    post: (url, data, header) => post(url, data, header),
    get: (url, header) => get(url, header)
}