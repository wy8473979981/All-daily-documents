import { Controller, RequestMapping } from '@pat-fet/mock-server'
import Page from '../helpers/page'
import { delayResp } from '../helpers/resp'

// eslint-disable-next-line
export default class finance_accounts extends Controller {
  // @RequestMapping({ url: '/backend/receive/getListPage', method: 'post' })
  pagedQuery (req, res, context) {
    return delayResp(new Page(req, this.collection.find()))
  }

  // @RequestMapping({ url: '/backend/receive/detail', method: 'post' })
  get (req, res, context) {
    return delayResp({})
  }
}
