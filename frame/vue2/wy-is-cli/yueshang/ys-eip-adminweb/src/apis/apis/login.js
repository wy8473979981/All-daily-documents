import { get, post } from '../interceptor'
import Base from './base.js'
import { URL } from "../URL"

// 用户登录相关接口
class Login extends Base {
  // 用户登录
  async userLogin (p, showMsg, useScreenLoadingBol = false) {
    const res = await post(URL.loginModule.loginUrl, p, useScreenLoadingBol)
    const code = {
      '200': '加载成功',
      '999': '令牌无效,请重新登录',
      '2001': '参数非法'
    }
    this.codeMap = code
    this.code = res.code
    this.showMsg = showMsg
    // this.message()
    return res
  }

  // 获取菜单
  async findAllMenu (p, showMsg, useScreenLoadingBol = false) {
    const res = await post(URL.loginModule.findAllMenuUrl, p, useScreenLoadingBol)
    return res
  }

  // 退出
  async loginOut (p, showMsg, useScreenLoadingBol = false) {
    const res = await post(URL.loginModule.loginOutUrl, p, useScreenLoadingBol)
    const code = {
      '200': '加载成功',
      '999': '令牌无效,请重新登录',
      '2001': '参数非法'
    }
    this.codeMap = code
    this.code = res.code
    this.showMsg = showMsg
    // this.message()
    return res
  }


  // 获取权限
  // async userLogin (p, showMsg) {
  //   const res = await post('acct/login', p)
  //   return res
  // }




}

const loginServe = new Login()
export default loginServe
