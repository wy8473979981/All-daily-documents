import Mock from 'mockjs'

const data = Mock.mock({
  'list|2-6': [{
    id: '@string(number, 8)',
    buyer: '@cname',
    seller: '@cname',
    type: '运单',
    amount: '@string(number, 4)',
    startDate: '@date',
    endDate: '@date',
    sepc: '@csentence(8, 32)'
  }]
}).list

export default data
