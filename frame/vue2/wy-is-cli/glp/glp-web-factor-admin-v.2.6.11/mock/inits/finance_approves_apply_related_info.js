import Mock from 'mockjs'

const data = [
  {
    amount: {
      type: '一次性转让',
      orderName: '返空汇应收账款转让',
      expiredDate: '2020-10-01',
      startDate: '2020-04-07',
      cert: '基础交易合同.jpg',
      amount: '100,000.00'
    },
    risk: {
      seller: '成都返空汇物流科技有限公司',
      orderNo: '984773838',
      cert: '合同.jpg',
      endDate: '2021-04-17',
      lastDate: '2020-10-17',
      amount: '100,000.00'
    },
    limit: {
      buyer: '河北金隅水泥有限公司',
      signDate: '2020-04-01',
      cert: '合同.jpg',
      remark: '返空汇应收账款转让描述',
      sepc: '生成随机数据,拦截 Ajax 请求。 通过随机数据,首先还是那句话,进来的GodBoy and GoodGirl 不妨看完再离开',
      amount: '830.47'
    },
    bills: Mock.mock({
      'list|2-6': [{
        id: '@string(number, 8)',
        no: '@string(number, 8)',
        amount: '@string(number, 4)',
        date: '@date',
        buyer: '@cname',
        seller: '@cname',
        code: '@string(number, 8)',
        noTaxAmount: '@string(number, 4)',
        taxAmount: '@string(number, 4)',
        summary: '@string(number, 4)',
        validCode: '@string(number, 6)',
        result: '@csentence(8, 32)'
      }]
    }).list
  }
]

export default data
