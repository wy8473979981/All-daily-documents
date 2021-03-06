import Mock from 'mockjs'

const data = Mock.mock({
  'list|20-100': [{
    id: '@string(number, 8)',
    no: '@string(number, 8)',
    name: '@cname',
    buyer: '@cname',
    seller: '@cname',
    amount: '@string(number, 4)',
    submittDate: '@date',
    endDate: '@date',
    transferStartDate: '@date',
    transferEndDate: '@date',
    'status|1': ['0', '1'],
    'signStatus|1': ['0', '1'],
    'project|1': ['0', '1'],
    certs: [
      {
        name: '1.docx',
        url: 'http://localhost:3000/nas/download/1.docx'
      }
    ],
    remark: '@csentence(8, 64)'
  }]
}).list

export default data
