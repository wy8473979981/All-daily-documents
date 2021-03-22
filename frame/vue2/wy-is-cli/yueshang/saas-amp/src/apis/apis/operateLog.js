import { post } from '../interceptor'
import Base from './base'

// 日志
class OperateLog extends Base {
  // 查找
  async find (p, showMsg) {
    const code = {
      '200': '加载成功',
      '999': '令牌无效,请重新登录',
      '2001': '参数非法',
    }
    const res = await post('/operate-log/list', p)
    this.codeMap = code
    this.code = res.code
    this.showMsg = showMsg
    // this.message()
    return res
  }
}

const operateLog = new OperateLog()

export default operateLog
