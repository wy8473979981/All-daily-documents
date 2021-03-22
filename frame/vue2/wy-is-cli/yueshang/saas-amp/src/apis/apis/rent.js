import { post, get } from '../interceptor'
import Base from './base'

// 沙盒
class Rent extends Base {
  // 获取列表
  async getList (p, showMsg) {
    const code = {
      '200': '加载成功',
      '999': '令牌无效,请重新登录',
      '2001': '参数非法',
    }
    const res = await post('/rental/list', p)
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
    const res = await get('/rental/flush', p)
    this.codeMap = code
    this.code = res.code
    this.showMsg = showMsg
    this.message()
    return res
  }

  // 详情列表
  async getLoad (p, showMsg) {
    const code = {
      '200': '加载成功',
      '999': '令牌无效,请重新登录',
      '2001': '参数非法',
      '2007': '数据不存在',
    }
    const res = await post('/rental/load', p)
    this.codeMap = code
    this.code = res.code
    this.showMsg = showMsg
    // this.message()
    return res
  }

}

const rent = new Rent()

export default rent
