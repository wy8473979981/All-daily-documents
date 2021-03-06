import Mock from 'mockjs'

const data = Mock.mock({
  'list|20-50': [{
    id: '@string(number, 8)',
    customerName: '@cname(number, 8)',
    customerType: '@pick(["个人管理", "企业管理"])',
    confirmNameStatus: '@ctitle(3, 5)',
    judgeConfirmName: '@ctitle(3, 5)',
    judgeAgent: '@ctitle(3, 5)'
  }]
}).list

export default data
