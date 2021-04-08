import Mock from 'mockjs'

const data = Mock.mock({
  'list|20-100': [{
    id: '@string(number, 5)',
    bussnessType: '@ctitle(3, 5)',
    sendTime: '@date("yyyy yy y MM M dd d")',
    bussnessNo: '@integer(10000)',
    noticeStyle: '@ctitle(3, 5)',
    noticeType: '@ctitle(3, 5)',
    noticeName: '@ctitle(3, 5)',
    emailPhone: '@integer(10000)',
    noteStatus: '@ctitle(3, 5)',
    noteTheme: '@ctitle(3, 5)',
    noteContent: '@ctitle(3, 5)'
  }]
}).list

export default data
