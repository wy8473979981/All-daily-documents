import { Controller, RequestMapping } from '@pat-fet/mock-server'
import Page from '../helpers/page'
import { delayResp } from '../helpers/resp'

// eslint-disable-next-line @typescript-eslint/class-name-casing
export default class users extends Controller {
  @RequestMapping({ url: '/users/query', method: 'get' })
  query (req, res, context) {
    return delayResp(this.collection.find())
  }
}
