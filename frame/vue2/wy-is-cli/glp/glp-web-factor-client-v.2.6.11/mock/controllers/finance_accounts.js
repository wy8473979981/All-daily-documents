import { Controller, RequestMapping, ResData } from '@pat-fet/mock-server'
import Page from '../helpers/page'
import { delayResp } from '../helpers/resp'
import { uid } from '../helpers/lang'

// eslint-disable-next-line
export default class finance_accounts extends Controller {
  @RequestMapping({ url: '/finance/accounts/paged', method: 'post' })
  pagedQuery (req, res, context) {
    return delayResp(new Page(req, this.collection.find()))
  }

  @RequestMapping({ url: '/finance/accounts/get/:id', method: 'get' })
  get (req, res, context) {
    const id = req.params.id
    return delayResp(this.collection.find({ id })[0])
  }

  @RequestMapping({ url: '/finance/accounts/update/:id', method: 'post' })
  update (req, res, context) {
    const model = req.body
    const id = req.params.id
    const entity = this.collection.find({ id })[0]
    if (!entity) throw new Error(`not found [${id}]`)
    Object.assign(entity, model)
    this.collection.update(entity)
    return delayResp(entity)
  }

  @RequestMapping({ url: '/finance/accounts/add', method: 'post' })
  add (req, res, context) {
    const model = req.body
    const id = uid
    const entity = Object.assign({ id }, model)
    this.collection.insert(entity)
    return delayResp(entity)
  }

  @RequestMapping({ url: '/clientend/receive/export', method: 'post' })
  exportExcel (req, res, context) {
    return new ResData('401', 'session失效', 'https://fbs.glpfin.com')
  }
}
