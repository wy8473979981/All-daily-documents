import Mock from 'mockjs'

const data = Mock.mock({
  'list|20-100': [{
    id: '@string(number, 8)',
    certNo: '@string(number, 8)', // 登记证明编号
    contractNo: '@string(number, 8)', // 保理合同编号
    agreementNo: '@string(number, 8)', // 应收账款转让登记协议编号
    'signBizType|1': [0, 1, 2], // 登记业务类型
    'signMonth|1': [0, 1, 2, 6, 12, 24], // 登记期限（月）
    signExpiredDate: '@date', // 登记到期日
    validCode: '@string(number, 8)', // 修改码
    buyerCompanyName: '@cname', // 买方企业
    sellerCompanyName: '@cname', // 卖方企业
    projectName: '@cname', // 项目名称
    'signType|1': [0, 1, 2], // 登记类型
    signDate: '@date', // 登记时间
    signer: '@cname', // 登记人
    files: [{ name: '1.pdf', url: 'http://www.baidu.com' }], // 中登登记文件
    remark: '@csentence(2, 32)' // 备注
  }]
}).list

export default data
