import Mock from 'mockjs'

const data = Mock.mock({
  'list|20-100': [{
    id: '@string(number, 8)',
    templateName: '@ctitle(3,5)',
    bussnessType: '@ctitle(3, 5)',
    createTime: '@date(yyyy-mm-dd)',
    modifyTime: '@date(yyyy-mm-dd)',
    information: '@ctitle(3, 5)',
    noteType: '@ctitle(3, 5)'
  }]
}).list

export default data
