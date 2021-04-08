import { Controller, RequestMapping } from '@pat-fet/mock-server'
import Page from '../helpers/page'
import { delayResp } from '../helpers/resp'

// eslint-disable-next-line
export default class finance_loans extends Controller {
  @RequestMapping({ url: '/finance/loans/paged', method: 'post' })
  pagedQuery (req, res, context) {
    return delayResp(new Page(req, this.collection.find()))
  }

  @RequestMapping({ url: '/finance/loans/fund/:id', method: 'get' })
  get (req, res, context) {
    const item = {
      orderNo: '20200316938372', // 订单号
      fundNo: req.params.id, // 放款单号
      fundAccount: '9837437448488', // 放款账号
      fundNumber: '普洛斯商业保理（重庆）有限公司', // 放款户名
      fundBank: '上海浦东发展银行', // 放款银行
      receiveAccount: '6786437441234', // 收款账号
      receiveNo: 'XXXXXX有限责任公司', // 收款户名
      receiveBank: '上海浦东发展银行', // 收款银行
      fundDate: '2020-01-01', // 放款时间
      fundAmount: '8,000.00', // 放款金额
      fundSummary: '保理服务款', // 放款摘要
      fundStatus: '放款成功' // 放款状态
    }
    return delayResp(item)
  }
}
