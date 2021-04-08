import { Controller, RequestMapping } from '@pat-fet/mock-server'
import Page from '../helpers/page'
import { delayResp } from '../helpers/resp'

// eslint-disable-next-line
export default class product extends Controller {
  @RequestMapping({ url: '/backend/project/product', method: 'post' })
  pagedQuery (req, res, context) {
    return delayResp(new Page(req, this.collection.find()))
  }

  @RequestMapping({ url: '/backend/project/product/get/:id', method: 'get' })
  get (req, res, context) {
    const id = req.params.id
    return delayResp(this.collection.find({ id })[0])
  }

  @RequestMapping({ url: '/backend/project/product/edit', method: 'post' })
  edit (req, res, context) {
    const params = req.params
    this.collection.insert(params)
  }

  @RequestMapping({ url: '/backend/project/product/delete/:id', method: 'post' })
  del (req, res, context) {
    const { id } = req.params
    const entity = this.collection.find({ id })[0]
    if (entity) {
      return this.collection.remove(entity)
    }
  }
}
