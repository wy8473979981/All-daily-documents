import { post, get } from '../interceptor'
import Base from './base'

// 城市档案
class City extends Base {
  // 查找
  async find (p, showMsg) {
    const code = {
      '200': '加载成功',
      '2001': '参数非法',
    }
    const res = await post('/archives/list', p)
    this.codeMap = code
    this.code = res.code
    this.showMsg = showMsg
    // this.message()
    return res
  }

  // 立即更新
  async nowUpdate (p, showMsg) {
    const code = {
      '200': '更新成功',
      '999': '令牌无效,请重新登录',
      '2001': '参数非法',
      '2015': '更新失败',
    }
    const res = await get('/archives/flush', p)
    this.codeMap = code
    this.code = res.code
    this.showMsg = showMsg
    this.message()
    return res
  }

}

const city = new City()

export default city
