import Mock from 'mockjs'

const data = Mock.mock({
  'list|20-100': [{
    id: '@string(number, 8)',
    invoiceNo: '@string(number, 8)',
    seller: '@cname',
    buyer: '@cname',
    date: '@date',
    amount: '@string(number, 4)',
    taxRate: '@string(number, 2)',
    'status|1': ['0', '1'],
    'validStatus|1': ['0', '1']
  }]
}).list

export default data
