import Mock from 'mockjs'

const data = Mock.mock({
  'list|20-100': [{
    id: '@string(number, 8)',
    date: '@date(yyyy-mm-dd)',
    note: '@county(true)',
    week: '周' + '@character("一二三四五六日")',
    'status|1': ['0', '1']
  }]
}).list

export default data
