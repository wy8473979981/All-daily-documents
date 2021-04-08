import Mock from 'mockjs'

const data = Mock.mock({
  'list|20-100': [{
    id: '@string(number, 8)',
    orderid: '@cname',
    applyMoney: '@cname',
    fkMoney: '@cname',
    produceName: '@cname)',
    seller: '@cname',
    buyer: '@cname',
    ActualPayee: '@cname',
    status: '@county(true)',
    createTime: '@datetime()'
  }]
}).list

export default data
