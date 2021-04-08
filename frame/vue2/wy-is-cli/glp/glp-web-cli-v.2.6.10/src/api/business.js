/*
	#author		lut000
    #date 		2019/11/07
    #purpose    业务逻辑接口
*/

import {get,post} from './axiosConfig';
export default {
    // 获取省份
    initDetailWarehouse:(data,header) => get('/fontApi/province/list',data,header),
    // 获取城市、区
    getDetailWarehouse:(data,header) => post('/fontApi/province/citycounty',data,header),

    post:(url,data,header) => post(url,data,header),
    get:(url,header) => get(url,header)
}