import Mock from 'mockjs'

const data = Mock.mock({
  'list|20-100': [{
    id: '@string(number, 5)',
    businessType: '@ctitle(3, 5)',
    reviewedNum: '@integer(10000)',
    newQutityNum: '@integer(10000)'
  }]
}).list

export default data
