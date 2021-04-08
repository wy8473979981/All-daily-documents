import { Controller, RequestMapping } from '@pat-fet/mock-server'
import Page from '../helpers/page'
import { delayResp } from '../helpers/resp'

// eslint-disable-next-line @typescript-eslint/class-name-casing
export default class baseInformation extends Controller {
  @RequestMapping({ url: '/base/information/list', method: 'post' })
  pagedQuery (req, res, context) {
    return delayResp(new Page(req, this.collection.find()))
  }

  @RequestMapping({ url: '/base/information/edit/:id', method: 'get' })
  edit (req, res, context) {
    const id = req.params.id
    return delayResp(this.collection.find({ id })[0])
  }

  @RequestMapping({ url: '/base/information/detail/:id', method: 'get' })
  detail (req, res, context) {
    const id = req.params.id
    return delayResp(this.collection.find({ id })[0])
  }
}
