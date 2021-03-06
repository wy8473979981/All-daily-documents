import { Controller, RequestMapping } from '@pat-fet/mock-server'
import Page from '../helpers/page'
import { delayResp } from '../helpers/resp'

// eslint-disable-next-line @typescript-eslint/class-name-casing
export default class calendar extends Controller {
  @RequestMapping({ url: '/base/calendar', method: 'post' })
  pagedQuery (req, res, context) {
    return delayResp(new Page(req, this.collection.find()))
  }

  @RequestMapping({ url: '/base/calendar/:id', method: 'post' })
  del (req, res, context) {
    const { id } = req.params
    const entity = this.collection.find({ id })[0]
    if (entity) {
      return this.collection.remove(entity)
    }
  }

  @RequestMapping({ url: '/base/calendar/add', method: 'post' })
  add (req, res, context) {
    const { params } = req.params
    return this.collection.insert({ params })
  }
}
