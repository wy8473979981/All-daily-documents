import { get, post } from '../interceptor'
import Base from './base.js'

// ip价值相关接口
class ManageValue extends Base {
  // 获取列表
  async getList (p, showMsg) {
    const res = await post('/operate/list', p)
    const code = {
      '200': '加载成功',
      '2001': '参数非法',
      '999': '令牌无效,请重新登录'
    }
    this.codeMap = code
    this.code = res.code
    this.showMsg = showMsg
    this.message()
    return res
  }

  // 列表数据删除
  async delList (p, showMsg) {
    const res = await post('/operate/del', p)
    const code = {
      '200': '提交成功',
      '999': '令牌无效,请重新登录',
      '2001': '参数非法',
      '2007': '数据不存在'
    }
    this.codeMap = code
    this.code = res.code
    this.showMsg = showMsg
    this.message()
    return res
  }

}

const manageValue = new ManageValue()
export default manageValue