import { get, post } from './axiosConfig';
export default {

    // 拜访- 导出 
    visitDownload: (data, header) => post('/glp-crm/customer/visit/export/visitExcel', data, header),
    

    post: (url, data, header) => post(url, data, header),
    get: (url, header) => get(url, header)
}