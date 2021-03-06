import { Controller, RequestMapping } from '@pat-fet/mock-server'
import Page from '../helpers/page'
import { delayResp } from '../helpers/resp'

// eslint-disable-next-line @typescript-eslint/class-name-casing
export default class invoiceOrderDetails extends Controller {
  @RequestMapping({ url: '/comp/invoiceOrder/detail/:id', method: 'post' })
  detail (req, res, context) {
    return delayResp(new Page(req, this.collection.find()))
  }

  @RequestMapping({ url: '/comp/invoiceOrder/detail1', method: 'post' })
  detail1 (req, res, context) {
    return delayResp(new Page(req, this.collection.find()))
  }
}
