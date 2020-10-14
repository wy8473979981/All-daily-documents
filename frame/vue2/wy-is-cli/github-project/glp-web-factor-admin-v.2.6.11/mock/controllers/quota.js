import { Controller, RequestMapping } from '@pat-fet/mock-server'
import Page from '../helpers/page'
import { delayResp } from '../helpers/resp'

// eslint-disable-next-line
export default class quota extends Controller {
  @RequestMapping({ url: '/backend/project/quota', method: 'post' })
  pagedQuery (req, res, context) {
    return delayResp(new Page(req, this.collection.find()))
  }

  @RequestMapping({ url: '/backend/project/quota/get/:id', method: 'get' })
  get (req, res, context) {
    const id = req.params.id
    return delayResp(this.collection.find({ id })[0])
  }

  @RequestMapping({ url: '/backend/project/quota/edit', method: 'post' })
  edit (req, res, context) {
    const params = req.params
    this.collection.insert(params)
  }
}
