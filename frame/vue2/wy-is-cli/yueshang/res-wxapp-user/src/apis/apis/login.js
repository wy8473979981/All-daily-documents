import { get, post } from '../interceptor'
import Base from './base.js'

// 用户登录相关接口
class Login extends Base {
  // 用户登录
  async userLogin (p, showMsg) {
    const res = await post('acct/login', p)
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

  // 单点登录
  async getUserinfo (p, showMsg) {
    const res = await post('auth/exempt/userinfo', p)
    return res
  }

  // 免授权单点登录
  async parseTokenToUser (p, showMsg) {
    const res = await post('auth/exempt/parseTokenToUser', p)
    return res
  }
}

const login = new Login()
export default login
