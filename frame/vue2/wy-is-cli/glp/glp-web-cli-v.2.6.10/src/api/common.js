/*
	#author		lut000
    #date 		2019/08/29
    #purpose    基础服务接口
*/

import {get,post} from './axiosConfig';
export default {
    // 获取用户信息
    getUserInfo:(data,header) => get('/fbs-app/user/personInfo',data,header),
    // 获取用户业务范围
    getUserInfoBusiness:(data,header) => get('/fbs-app/user/personInfoAndBusinessRange',data,header),
    // 获取用户菜单接口
    getPermList:(data,header) => get('/fbs-app/user/roleAndPermList',data,header),

    
    // ocr-身份证
    getOcrIdCard:(data,header) => get('/fontApi/ocr/idCard',data,header),

    // 获取省份
    getProvince:(data,header) => get('/fontApi/province/list',data,header),
    // 获取城市、区
    getCitys:(data,header) => post('/fontApi/province/citycounty',data,header),

    // 退出登录
    signOut:(data,header) => get('/fbs-app/loginManage/logout',data,header),

    //获取阿里云签名token
    getStsToken: (data,header) => get('/fontApi/oss/stsToken', data,header),

    post:(url,data,header) => post(url,data,header),
    get:(url,header) => get(url,header)
}