import Mock from 'mockjs'

const data = Mock.mock({
  'list|20-100': [{
    id: '@string(number, 8)',
    noteType: '@cname',
    platformName: '@cname',
    type: '@county(true)',
    sellerName: '@county(true)',
    orderDate: '@datetime()',
    orderMoney: '@county(true)',
    flowStatus: '@county(true)',
    effectiveStatus: '@datetime()'
  }]
}).list

export default data
