import { get, post } from '../interceptor'
import Base from './base.js'
import { URL } from "../URL"

// 公共模块
class common extends Base {
  // 应用列表模糊查询
  async midAppIndistinct (p, showMsg, useScreenLoadingBol = false) {
    const res = await get(URL.commonModule.midAppIndistinctUrl, p, useScreenLoadingBol)
    const code = {
      '200': '加载成功',
      '999': '令牌无效,请重新登录',
      '2001': '参数非法'
    }
    this.codeMap = { ...{ [res.code]: res.message }, ...code }
    this.code = res.code
    this.showMsg = showMsg
    // this.message()
    return res
  }

  // 服务（API）列表模糊查询
  async midBusinessIndistinct (p, showMsg, useScreenLoadingBol = false) {
    const res = await get(URL.commonModule.midBusinessIndistinctUrl, p, useScreenLoadingBol)
    const code = {
      '200': '加载成功',
      '999': '令牌无效,请重新登录',
      '2001': '参数非法'
    }
    this.codeMap = { ...{ [res.code]: res.message }, ...code }
    this.code = res.code
    this.showMsg = showMsg
    // this.message()
    return res
  }

  // 字典接口
  async getDict (p, showMsg, useScreenLoadingBol = false) {
    const res = await get(URL.commonModule.dictUrl, p, useScreenLoadingBol)
    const code = {
      '200': '加载成功',
      '999': '令牌无效,请重新登录',
      '2001': '参数非法'
    }
    this.codeMap = { ...{ [res.code]: res.message }, ...code }
    this.code = res.code
    this.showMsg = showMsg
    // this.message()
    return res
  }





}

const commonServe = new common()
export default commonServe
