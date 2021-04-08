import { get, post } from './axiosConfig';
export default {

    // 分润设置- 新增
    create: (data, header) => post('/glp-crm/share/profit/create', data, header),

    // 分润设置- 更新
    update: (data, header) => post(`/glp-crm/share/profit/update`, data, header),

    // 分润设置-获取详情
    getDetail: (data) => get(`/glp-crm/share/profit/detail/${data}`),

    post: (url, data, header) => post(url, data, header),
    get: (url, header) => get(url, header)
}
