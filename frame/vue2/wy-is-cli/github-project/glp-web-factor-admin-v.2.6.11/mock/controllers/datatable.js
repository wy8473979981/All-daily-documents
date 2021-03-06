import { Controller, RequestMapping } from '@pat-fet/mock-server'
import Page from '../helpers/page'
import { delayResp } from '../helpers/resp'

// eslint-disable-next-line @typescript-eslint/class-name-casing
export default class datatable extends Controller {
  @RequestMapping({ url: '/comp/datatable/get', method: 'get' })
  query (req, res, context) {
    return delayResp(this.collection.find())
  }

  @RequestMapping({ url: '/comp/datatable/paged', method: 'post' })
  pagedQuery (req, res, context) {
    return delayResp(new Page(req, this.collection.find()))
  }

  @RequestMapping({ url: '/comp/datatable/get/:id', method: 'get' })
  get (req, res, context) {
    const id = req.params.id
    return delayResp(this.collection.find({ id })[0])
  }
}
