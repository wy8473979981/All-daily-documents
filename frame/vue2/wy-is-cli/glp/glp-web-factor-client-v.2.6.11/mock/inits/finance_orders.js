import Mock from 'mockjs'

const data = Mock.mock({
  'list|20-100': [{
    id: '@string(number, 8)',
    orderNumber: '@string(number, 8)',
    amount: '@float(1, 100000)',
    realityLoanAmount: '@float(1, 100000)',
    sellerCompanyName: '@cname',
    buyerCompanyName: '@cname',
    payee: '@cname',
    createTime: '@date(T)',
    'status|1': ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
    'invoiceStatus|1': ['0', '1']
  }]
}).list

export default data
