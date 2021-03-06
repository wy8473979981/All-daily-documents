import Mock from 'mockjs'

const data = Mock.mock({
  'list|20-100': [{
    id: '@string(number, 8)',
    buyer: '@cname',
    seller: '@cname',
    ammount: '@string(number, 4)',
    usedAmmount: '@string(number, 4)',
    availAmmount: '@string(number, 4)',
    signDate: '@date',
    expiredDate: '@date',
    submitDate: '@date',
    'ammountStatus|1': ['0', '1'],
    'signStatus|1': ['0', '1', '2'],
    name: '@cname',
    no: '@string(number, 8)',
    orderFiles: [{ name: '合同材料.docx', url: 'http://localhost:3000/nas/download/1.docx' }, { name: '合同快照.jpg', url: 'http://localhost:3000/nas/download/1.jpg' }],
    startDate: '@date',
    endDate: '@date',
    cert: 'http://www.baidu.com',
    remark: '@csentence(32, 128)',
    sepc: '@csentence(32, 128)'
  }]
}).list

export default data
