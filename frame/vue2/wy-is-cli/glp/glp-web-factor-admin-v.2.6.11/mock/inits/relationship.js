import Mock from 'mockjs'

const data = Mock.mock({
  'list|20-100': [{
    id: '@string(number, 5)',
    buyName: '@cname(2,3)',
    saleName: '@cname(2,3)',
    'financingRate|1-100.2': 1,
    updateTime: '@datetime("yyyy-MM-dd A HH:mm:ss")',
    relationshipNo: '@string(number, 5)',
    'relationshipStatus|1': ['0', '1']
  }]
}).list

export default data
