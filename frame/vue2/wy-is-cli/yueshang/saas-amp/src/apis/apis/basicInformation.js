import { get, post } from '../interceptor'
import Base from './base.js'

// 基础信息相关接口
class Basic extends Base {
  // 获取列表数据
  async getProjectList (p, showMsg) {
    const res = await post('/project/list', p)
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

  // 列表数据删除
  async delList (p, showMsg) {
    const res = await post('/project/del', p)
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

  // 列表下载导入模板
  async downLoad (p, showMsg) {
    const res = await get('/project/down', p)
    const code = {
      '200': '加载成功',
      '999': '令牌无效,请重新登录',
      '2001': '参数非法'
    }
    this.codeMap = code
    this.code = res.code
    this.showMsg = showMsg
    this.message()
    return res
  }
}

const basic = new Basic()
export default basic
