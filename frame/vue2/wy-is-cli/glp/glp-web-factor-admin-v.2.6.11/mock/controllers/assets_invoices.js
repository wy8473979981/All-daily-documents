import { Controller, RequestMapping } from '@pat-fet/mock-server'
import Page from '../helpers/page'
import { delayResp } from '../helpers/resp'

// eslint-disable-next-line
export default class assets_invoices extends Controller {
  @RequestMapping({ url: '/assets/invoices/paged', method: 'post' })
  pagedQuery (req, res, context) {
    return delayResp(new Page(req, this.collection.find()))
  }

  @RequestMapping({ url: '/assets/invoices/:id', method: 'get' })
  get (req, res, context) {
    const item = {
      invoiceNo: '47721439', // 发票号码
      receiver: 'XXXXX有限公司', // 收票方
      taxerNo: '32102223333333333', // 收票方纳税人识别号
      payName: 'YYYYY有限公司', // 开票方名称
      payNo: '67686786787687687', // 开票方纳税人识别号
      payAmount: '10,000.00', // 开票金额
      payContent: '劳务服务费', // 发票内容
      payDate: '2020-04-02', // 开票日期
      payUrl: '47721439.jpg' // 发票文件
    }
    return delayResp(item)
  }
}
