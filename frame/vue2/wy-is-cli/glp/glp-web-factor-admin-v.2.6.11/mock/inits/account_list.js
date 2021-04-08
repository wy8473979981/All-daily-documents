import Mock from 'mockjs'

const data = Mock.mock({
  'list|20-50': [{
    accNO: '@string(number, 8)',
    cellphone: '@string(number, 11)',
    relationCustomer: '@ctitle(3, 5)',
    relationProject: '@ctitle(3, 5)'
  }]
}).list

export default data
