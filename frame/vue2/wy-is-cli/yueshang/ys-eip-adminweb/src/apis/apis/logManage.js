import { get, post } from '../interceptor'
import Base from './base.js'
import { URL } from "../URL"

// 日志管理
class logManage extends Base {
  // 请求日志-列表
  async qqLogList (p, showMsg, useScreenLoadingBol = true) {
    const res = await post(URL.logManage.qqLogListUrl, p, useScreenLoadingBol)
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

  // 请求日志-详情
  async qqLogDetail (p, showMsg, useScreenLoadingBol = true) {
    const res = await get(URL.logManage.qqLogDetailUrl, p, useScreenLoadingBol)
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

  // 回调日志-列表
  async hdLogList (p, showMsg, useScreenLoadingBol = true) {
    const res = await post(URL.logManage.hdLogListUrl, p, useScreenLoadingBol)
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

  // 回调日志-详情
  async hdLogDetail (p, showMsg, useScreenLoadingBol = true) {
    const res = await get(URL.logManage.hdLogDetailUrl, p, useScreenLoadingBol)
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

const logManageServe = new logManage()
export default logManageServe
