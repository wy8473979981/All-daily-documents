import { Controller, RequestMapping } from '@pat-fet/mock-server'
import Page from '../helpers/page'
import { delayResp } from '../helpers/resp'

// eslint-disable-next-line
export default class customer_list_enterprise extends Controller {
  @RequestMapping({ url: '/customer/list/enterprise-detail/list', method: 'post' })
  infoQuery (req, res, context) {
    return delayResp(new Page(req, this.collection.find()))
  }
}
