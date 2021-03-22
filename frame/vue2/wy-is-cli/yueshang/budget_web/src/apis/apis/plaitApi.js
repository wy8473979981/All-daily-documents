import { get, post } from '../interceptor'
import Base from './base'

// 预算编制-主页面
class PlaitApi extends Base {
  async find (p, showMsg) {
    const code = {
      0: '加载成功',
    }
    const res = await post('/intanceSheet/list', p)
    this.codeMap = { ...{ [res.code]: res.msg }, ...code }
    this.code = res.code
    this.showMsg = showMsg
    // this.message()
    return res
  }
}
const plaitApi = new PlaitApi()

export default plaitApi
