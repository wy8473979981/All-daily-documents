import { Controller, RequestMapping } from '@pat-fet/mock-server'
import Page from '../helpers/page'
import { delayResp } from '../helpers/resp'

// eslint-disable-next-line
export default class relationship extends Controller {
  @RequestMapping({ url: '/backend/relationship/list', method: 'post' })
  pagedQuery (req, res, context) {
    return delayResp(new Page(req, this.collection.find()))
  }

  @RequestMapping({ url: '/backend/relationship/get/:id', method: 'get' })
  get (req, res, context) {
    const id = req.params.id
    return delayResp(this.collection.find({ id })[0])
  }

  @RequestMapping({ url: '/backend/relationship/edit', method: 'post' })
  edit (req, res, context) {
    const params = req.params
    this.collection.insert(params)
  }
}
