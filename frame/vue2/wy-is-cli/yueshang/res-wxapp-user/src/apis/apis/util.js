import { get } from '../interceptor'
import Base from './base'

class Util extends Base {
  getKaptcha (p, responseType) {
    return get('/imgCode', p, responseType)
  }
}
const util = new Util()

export default util
