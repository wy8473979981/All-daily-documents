import Mock from 'mockjs'

const data = Mock.mock({
  'list|20-100': [{
    id: '@string(number, 8)',
    accountName: '@ctitle(8)id',
    accountNo: '@string(number, 16)',
    accountBank: '@ctitle(3, 5)',
    accountBranchBank: '@ctitle(3, 5)',
    bindAccountName: '@string(number, 8)',
    bindAccountNo: '@string(number, 16)',
    accountType: '@ctitle(3, 5)',
    approvalStatus: '@ctitle(3, 5)',
    'status|1': ['0', '1']
  }]
}).list

export default data
