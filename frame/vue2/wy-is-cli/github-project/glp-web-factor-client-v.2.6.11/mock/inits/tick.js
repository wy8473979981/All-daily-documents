import Mock from 'mockjs'

const data = Mock.mock({
  'list|20-100': [{
    a: '@string(number, 8)',
    b: '@cname',
    c: '@cname',
    d: '@county(true)',
    e: '@cname',
    f: '@cname',
    g: '@county(true)',
    h: '@cname',
    i: '@datetime()',
    'status|1': true
  }]
}).list

export default data
