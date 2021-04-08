import { Controller, RequestMapping } from '@pat-fet/mock-server'
import Page from '../helpers/page'
import { delayResp } from '../helpers/resp'

// eslint-disable-next-line
export default class notice_rule extends Controller {
  @RequestMapping({ url: '/base/notice-rule/paged', method: 'post' })
  pagedQuery (req, res, context) {
    return delayResp(new Page(req, this.collection.find()))
  }

  @RequestMapping({ url: '/base/notice-rule/get/:id', method: 'get' })
  get (req, res, context) {
    const id = req.params.id
    return delayResp(this.collection.find({ id })[0])
  }

  @RequestMapping({ url: '/base/notice-rule/edit', method: 'post' })
  edit (req, res, context) {
    const params = req.params
    this.collection.insert(params)
  }
}
