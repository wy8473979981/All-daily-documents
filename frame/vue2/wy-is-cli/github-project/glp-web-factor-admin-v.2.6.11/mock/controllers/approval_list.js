import { Controller, RequestMapping } from '@pat-fet/mock-server'
import Page from '../helpers/page'
import { delayResp } from '../helpers/resp'

// eslint-disable-next-line
export default class approval_list extends Controller {
  @RequestMapping({ url: '/backend/todo/approval/list', method: 'post' })
  pagedQuery (req, res, context) {
    return delayResp(new Page(req, this.collection.find()))
  }

  @RequestMapping({ url: '/backend/todo/approval/list/:id', method: 'get' })
  get (req, res, context) {
    const id = req.params.id
    return delayResp(this.collection.find({ id })[0])
  }
}
