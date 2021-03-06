/*
	#author		lut000
    #date 		2019/08/29
    #purpose    基础服务接口
*/

import { get, post } from './axiosConfig';
export default {
    // 获取用户信息
    getUserInfo: (data, header) => get('/fbs-app/user/personInfo', data, header),
    // 获取用户业务范围
    getUserInfoBusiness: (data, header) => get('/fbs-app/user/personInfoAndBusinessRange', data, header),
    // 获取用户菜单接口
    getPermList: (data, header) => get('/fbs-app/user/roleAndPermList', data, header),


    // ocr-身份证
    getOcrIdCard: (data, header) => get('/fontApi/ocr/idCard', data, header),

    // 获取省份
    getProvince: (data, header) => get('/fontApi/province/list', data, header),
    // 获取城市、区
    getCitys: (data, header) => post('/fontApi/province/citycounty', data, header),

    // 退出登录
    signOut: (data, header) => get('/fbs-app/loginManage/logout', data, header),

    //获取阿里云签名token
    getStsToken: (data, header) => get('/glp-crm/material/oss/stsToken', data, header),

    // 获取全部字典表
    getAllDict: (data, header) => get('/glp-crm/dictionary/list', data, header),

    // 获取代办条数
    getTodoNum: (data, header) => get('/glp-crm/process/queryTodoNum', data, header),

    

    // 查询用户,带分页
    getUserList: (data, header) => post('/fbs-app/user/getPersonListPage', data, header),

    // 查询用户,不带分页
    getUserListNoPage: (data, header) => post('/fbs-app/user/getPersonList', data, header),
    

    post: (url, data, header) => post(url, data, header),
    get: (url, header) => get(url, header)
}