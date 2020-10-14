import Mock from 'mockjs'

const data = Mock.mock({
  'list|20-100': [{
    invoiceNo: '@string(number, 8)',
    invoiceCode: '@cname',
    buyerCompName: '@cname',
    'isValid|0-1': 1,
    'useStatus|1-3': 1
  }]
}).list

export default data
