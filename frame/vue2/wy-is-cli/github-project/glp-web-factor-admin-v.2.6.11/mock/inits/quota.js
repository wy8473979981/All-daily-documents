import Mock from 'mockjs'

const data = Mock.mock({
  'list|20-100': [{
    id: '@string(number, 5)',
    customerName: '@cname(2,3)',
    quotaNo: '@string(number, 5)',
    bussnessTag: '@pick(["普运贷","普链保"])',
    quotaName: '@ctitle(3, 5)',
    quotaProperty: '@ctitle(3, 5)',
    approvedQuota: '@integer(10000)',
    availableQuota: '@integer(10000)',
    isCycleQuota: '@pick(["0","1"])',
    quotaValidity: '@date()',
    reservedQuota: '@ctitle(3, 5)',
    factQuota: '@ctitle(3, 5)',
    forbiddenQuota: '@ctitle(3, 5)',
    quotaStatus: '@integer(10000)',
    customerManager: '@ctitle(3, 5)',
    riskControlManager: '@cname(2,5)',
    'status|1': ['0', '1']
  }]
}).list

export default data
