import { get, post } from '../interceptor'
import Base from './base.js'

class User extends Base {
  async userLogin (p, showMsg) {
    const res = await post('/login', p)
    const code = {
      200: '登录成功',
      2001: '参数非法',
      2002: '图形验证码已失效',
      2003: '图形验证码有误',
      2004: '用户名不存在',
      2005: '账户已被冻结',
      2006: '密码不正确'
    }
    this.codeMap = code
    this.code = res.code
    this.showMsg = showMsg
    this.message()
    return res
  }

  // 宝龙amp登录后返回权限菜单
  async userLoginBL (p, showMsg) {
    const res = await post('/login_bl', p)
    const code = {
      200: '登录成功',
      2001: '参数非法',
      2002: '图形验证码已失效',
      2003: '图形验证码有误',
      2004: '用户名不存在',
      2005: '账户已被冻结',
      2006: '密码不正确'
    }
    this.codeMap = code
    this.code = res.code
    this.showMsg = showMsg
    this.message()
    return res
  }

  // 宝龙amp单点登录接口
  async userLoginBLSSO (p, showMsg) {
    const res = await post('/login_bl_sso', p)
    const code = {
      200: '登录成功',
      2001: '参数非法',
      2002: '图形验证码已失效',
      2003: '图形验证码有误',
      2004: '用户名不存在',
      2005: '账户已被冻结',
      2006: '密码不正确'
    }
    this.codeMap = code
    this.code = res.code
    this.showMsg = showMsg
    // this.message()
    return res
  }

  async userLogout (p, showMsg) {
    const res = await get('/logout', p)
    const code = {
      200: '退出成功'
    }
    this.codeMap = code
    this.code = res.code
    this.showMsg = showMsg
    this.message()
    return res
  }

  // 同步模板
  async synchronous (p, showMsg) {
    const res = await get('/contractMould/sync', p)
    const code = {
      200: '同步成功',
      2001: '参数非法',
      2014: '无法在服务器进行身份验证',
      2015: '无法同步，请联系管理员',
      2016: '数据同步有异常，请联系管理员'
    }
    this.codeMap = code
    this.code = res.code
    this.showMsg = showMsg
    this.message()
    return res
  }
}

const user = new User()
export default user
