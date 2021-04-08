import Mock from 'mockjs'

const data = Mock.mock({
  'list|20-100': [{
    id: '@string(number, 8)',
    accountName: '@cname',
    accountNo: '@string(number, 16)',
    openBank: '@county(true)',
    openBranchBank: '@county(true)',
    submitDate: '@datetime()',
    'status|1': ['0', '1']
  }]
}).list

export default data
