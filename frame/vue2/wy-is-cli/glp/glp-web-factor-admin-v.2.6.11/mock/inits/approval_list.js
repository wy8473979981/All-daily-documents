import Mock from 'mockjs'

const data = Mock.mock({
  'list|20-100': [{
    id: '@string(number, 5)',
    workOrderNo: '@string(number, 8)',
    bussnessOrderNo: '@integer(10000)',
    title: '@ctitle(3, 5)',
    processName: '@ctitle(3, 5)',
    createTime: '@datetime()',
    doneTime: '@datetime()',
    currentNode: '@integer(10000)',
    'status|1': ['0', '1']
  }]
}).list

export default data
