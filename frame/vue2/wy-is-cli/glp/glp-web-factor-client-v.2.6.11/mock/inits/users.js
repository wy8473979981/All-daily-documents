import Mock from 'mockjs'

const data = Mock.mock({
  'list|5-20': [{
    id: '@string(number, 8)',
    userCode: '@string(number, 8)',
    userName: '@cname'
  }]
}).list

export default data
