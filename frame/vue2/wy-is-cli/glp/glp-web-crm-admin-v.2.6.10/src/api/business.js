/*
	#author		lut000
    #date 		2019/11/07
    #purpose    业务逻辑接口
*/
import {get,post} from './axiosConfig';
export default {
    // 商机-获取详情
    getDetail:(data) => get(`/glp-crm/business/opportunity/detail/${data}`),

    // 获取-历史商机阶段分页
    delete:(data) => get(`/glp-crm/business/opportunity/step/delete/${data}`),

    // 商机-批量删除
    deleteList: (data, header) => post('/glp-crm/business/opportunity/delete', data, header),

    // 商机- 新增
    createBusiness: (data, header) => post('/glp-crm/business/opportunity/create', data, header),

    // 商机- 更新
    updateBusiness: (data, header) => post(`/glp-crm/business/opportunity/update`, data, header),

    post:(url,data,header) => post(url,data,header),
    get:(url,header) => get(url,header)
}
