import Mock from 'mockjs'
const data = Mock.mock({
  'list|20-100': [{
    a: '@string(number, 8)',
    b: '@cname',
    c: '@string(number, 16)',
    d: '@county(true)',
    e: '@county(true)',
    f: '@string(number, 8)',
    g: '@cname'
  }]
}).list
export default data
