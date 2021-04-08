import Mock from 'mockjs'

const data = Mock.mock({
  'list|20-100': [{
    id: '@string(number, 8)',
    orderNo: '@string(number, 8)',
    name: '@cname',
    'type|1': ['运单', '油卡充值'],
    seller: '@cname',
    date: '@date',
    amount: '@string(number, 4)',
    'status|1': ['0', '1'],
    'validStatus|1': ['0', '1']
  }]
}).list

export default data
