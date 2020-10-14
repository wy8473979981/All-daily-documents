import { get, post } from './axiosConfig';
export default {

    // 联系人- 批量删除、删除 
    deleteContacts: (data, header) => post('/glp-crm/contact/deleteByIds', data, header),

    // 联系人- 新增
    createContacts: (data, header) => post('/glp-crm/contact/createContact', data, header),

    // 联系人- 详情
    contactsDetailById: (id, header) => get(`/glp-crm/contact/detail/${id}`, header),

    // 联系人- 更新
    updateContacts: (data, header) => post(`/glp-crm/contact/updateContact`, data, header),


    post: (url, data, header) => post(url, data, header),
    get: (url, header) => get(url, header)
}