import { Controller, RequestMapping } from '@pat-fet/mock-server'
import Page from '../helpers/page'
import { delayResp } from '../helpers/resp'

// eslint-disable-next-line
export default class finance_approves_apply_risk_info extends Controller {
  @RequestMapping({ url: '/finance/approves/:id/apply/risk-info', method: 'get' })
  pagedQuery (req, res, context) {
    return delayResp(this.collection.find()[0])
  }

  // @RequestMapping({ url: '/finance/accounts/get/:id', method: 'get' })
  // get (req, res, context) {
  //   const id = req.params.id
  //   return delayResp(this.collection.find({ id })[0])
  // }
}
