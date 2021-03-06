import { Controller, RequestMapping } from '@pat-fet/mock-server'
import Page from '../helpers/page'
import { delayResp } from '../helpers/resp'

// eslint-disable-next-line
export default class assets_notes extends Controller {
  @RequestMapping({ url: '/assets/notes/paged', method: 'post' })
  pagedQuery (req, res, context) {
    return delayResp(new Page(req, this.collection.find()))
  }

  @RequestMapping({ url: '/assets/notes/:id', method: 'get' })
  get (req, res, context) {
    const item = {
      noteNo: '394939594959345', // 票据号码
      amount: '100,000.00', // 票据金额
      buyer: 'XXXX有限公司', // 买方名称
      seller: 'XXXX22有限公司', // 卖方名称
      billName: 'XXXX33有限公司', // 出票人名称
      accepter: 'XXXX33有限公司', // 承兑人名称
      bail: 'xxx', // 保证人
      type: '银行承兑汇票', // 票据类型
      validDate: '2020-07-09', // 基础债权生效时间
      expiredDate: '2020-07-09', // 基础债权还款时间
      startDate: '2020-07-09', // 出票日
      endDate: '2020-07-09' // 到期日
    }
    return delayResp(item)
  }
}
