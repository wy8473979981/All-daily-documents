import Mock from 'mockjs'

const data = Mock.mock({
  'list|20-100': [{
    id: '@string(number, 5)',
    projectName: '@ctitle(2,3)',
    projectNo: '@string(number, 5)',
    updateTime: '@date()',
    financialProducts: '@ctitle(3, 5)',
    quotaNo: '@string(number, 5)',
    projectStutas: '@pick(["0","1","2","3"])',
    customerManager: '@cname(2,3)',
    'status|1': ['0', '1', '2']
  }]
}).list

export default data
