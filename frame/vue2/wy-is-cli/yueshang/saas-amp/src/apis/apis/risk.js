import { post, get } from '../interceptor'
import Base from './base'

// 沙盒
class Risk extends Base {
  // 获取列表
  async getList (p, showMsg) {
    const code = {
      '200': '加载成功',
      '999': '令牌无效,请重新登录',
      '2001': '参数非法',
    }
    const res = await post('/rism/list', p)
    this.codeMap = code
    this.code = res.code
    this.showMsg = showMsg
    // this.message()
    return res
  }

  // 加载详情
  async getDetail (p, showMsg) {
    const code = {
      '200': '加载成功',
      '999': '令牌无效,请重新登录',
      '2001': '参数非法',
      '2007': '数据不存在',
    }
    const res = await post('/rism/details', p)
    this.codeMap = code
    this.code = res.code
    this.showMsg = showMsg
    // this.message()
    return res
  }

  // 立即刷新
  async flush (p, showMsg) {
    const code = {
      '200': '更新成功',
      '999': '令牌无效,请重新登录',
      '2001': '参数非法',
      '2015': '更新失败',
    }
    const res = await post('/rism/flush', p)
    this.codeMap = code
    this.code = res.code
    this.showMsg = showMsg
    this.message()
    return res
  }

  // 更新
  async update (p, showMsg) {
    const code = {
      '200': '更新成功',
      '999': '令牌无效,请重新登录',
      '2001': '参数非法',
    }
    const res = await post('/rism/update', p)
    this.codeMap = code
    this.code = res.code
    this.showMsg = showMsg
    this.message()
    return res
  }

}

const risk = new Risk()

export default risk
