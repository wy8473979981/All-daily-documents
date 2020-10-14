import { get, post } from './axiosConfig';
export default {
    // 市场活动- 列表查询
    queryMarket: (data, header) => post('/glp-crm/activity/queryList', data, header),

    // 市场活动- 批量删除、删除
    deleteMarket: (data, header) => post('/glp-crm/activity/deleteByIds', data, header),

    // 市场活动-新增
    addMarket: (data, header) => post('/glp-crm/activity/create', data, header),

    // 市场活动-修改
    updateMarket: (data, header) => post('/glp-crm/activity/update', data, header),

    // 市场活动-共享列表-查询
    shareMarket: (data, header) => post(`/glp-crm/sysShare/query`, data, header),

    // 市场活动-共享-新建
    shareCreateMarket: (data, header) => post(`/glp-crm/sysShare/create`, data, header),

    // 市场活动-共享-弹窗列表-删除
    shareDeleteMarket: (data, header) => post(`/glp-crm/sysShare/delete`, data, header),

    // 市场活动-详情
    getMarketDetail: (id, header) => get(`/glp-crm/activity/detail/${id}`, header),

    // 市场活动-渠道-新增
    addChannel: (data, header) => post('/glp-crm/marketActivity/channel/create', data, header),
    // 市场活动-渠道-修改
    updateChannel: (data, header) => post('/glp-crm/marketActivity/channel/update', data, header),
    // 市场活动-渠道-详情
    getChannelDetail: (id, header) => get(`/glp-crm/marketActivity/channel/detail/${id}`, header),
    // 市场活动-渠道-删除
    deleteChannel: (id, header) => get(`/glp-crm/marketActivity/channel/delete/${id}`, header),

    // 市场活动-客户-关联建立
    createCustomer: (data, header) => post('/glp-crm/activity/createCustomerRelated', data, header),

    // 市场活动-相关客户列表-删除
    deleteRelatedCustomer: (data, header) => post(`/glp-crm/activity/deleteCustomerRelated`, data, header),

    post: (url, data, header) => post(url, data, header),
    get: (url, header) => get(url, header)
}