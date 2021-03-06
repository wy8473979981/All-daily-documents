import { Controller, RequestMapping } from '@pat-fet/mock-server'
import Page from '../helpers/page'
import { delayResp } from '../helpers/resp'

// eslint-disable-next-line @typescript-eslint/class-name-casing
export default class businessList extends Controller {
  @RequestMapping({ url: '/comp/business/paged', method: 'post' })
  pagedQuery (req, res, context) {
    return delayResp(new Page(req, this.collection.find()))
  }
}
