import Mock from 'mockjs'

const data = Mock.mock({
  'list|20-100': [{
    id: '@string(number, 8)',
    name: '@cname',
    age: '@integer(1, 100)',
    address: '@county(true)',
    'status|1': ['0', '1']
  }]
}).list

export default data
