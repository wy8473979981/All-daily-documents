import Mock from 'mockjs'

const data = Mock.mock({
  'list|20-100': [{
    orderNumber: '@string(number, 8)',
    amount: '@float(1, 100000)',
    realityLoanAmount: '@float(1, 100000)',
    handlingFee: '@float(1, 100000)',
    'productType|1': ['0', '1'],
    projectName: '@cname',
    sellerCompanyName: '@cname',
    buyerCompanyName: '@cname',
    principal: '@cname',
    createUser: '@cname',
    payee: '@cname',
    'status|1': ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
    'flowNode|1': ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
    'invoiceStatus|1': ['0', '1'],
    createTime: '@date'
  }]
}).list

export default data
