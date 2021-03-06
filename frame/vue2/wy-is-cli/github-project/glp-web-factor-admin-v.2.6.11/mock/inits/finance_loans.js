import Mock from 'mockjs'

const data = Mock.mock({
  'list|20-100': [{
    id: '@string(number, 8)',
    orderNo: '@string(number, 8)',
    fundNo: '@string(number, 8)',
    'status|1': ['0', '1'],
    'payStatus|1': ['0', '1'],
    fundAmount: '@string(number, 4)',
    fundDate: '@date',
    'mode|1': ['0', '1'],
    name: '@cname',
    buyer: '@cname',
    seller: '@cname',
    receiver: '@cname',
    applyDate: '@date'
  }]
}).list

export default data
