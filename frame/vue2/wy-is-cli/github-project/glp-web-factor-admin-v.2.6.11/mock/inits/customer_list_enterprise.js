import Mock from 'mockjs'

const data = Mock.mock({
  'list|20-50': [{
    id: '@string(number, 8)',
    agentType: '@cname(number, 8)',
    agentName: '@pick(["个人管理", "企业管理"])',
    agentPhone: '@ctitle(3, 5)',
    agentStatus: '@ctitle(3, 5)',
    agentAttchment: '@ctitle(3, 5)'
  }]
}).list

export default data
