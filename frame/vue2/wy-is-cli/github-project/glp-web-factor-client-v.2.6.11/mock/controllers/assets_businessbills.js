import { Controller, RequestMapping } from '@pat-fet/mock-server'
import Page from '../helpers/page'
import { delayResp } from '../helpers/resp'

// eslint-disable-next-line
export default class assets_businessbills extends Controller {
  @RequestMapping({ url: '/assets/business-bills/paged', method: 'post' })
  pagedQuery (req, res, context) {
    return delayResp(new Page(req, this.collection.find()))
  }

  @RequestMapping({ url: '/assets/business-bills/:id', method: 'get' })
  get (req, res, context) {
    const item = {
      type: '运单', // 单据类型
      channel: 'G7', // 渠道信息
      seller: '成都返空汇物流科技有限公司', // 卖方信息
      transBuyer: '', // 运单买方
      transSeller: '', // 运单卖方
      startAddress: '从XXX 到 YYYY', // 起讫地
      finishDate: '20150320', // 完成时间
      goodsType: '钢铁', // 货物种类
      amount: '80000', // 单据金额
      date: '20200520', // 单据日期
      status: '未融资', // 单据状态
      remark: '', // 标识描述
      url: '46669.jpg' // 单据文件
    }
    return delayResp(item)
  }
}
