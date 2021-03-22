import { get, post } from '../interceptor'
import Base from './base'

// 预算查看
class Service extends Base {
  // 主页面-列表数据
  async getTableList (p, showMsg) {
    const code = {
      200: '加载成功',
      999: '令牌无效,请重新登录',
      2001: '参数非法'
    }
    const res = await post('/instance/queryPage', p)
    this.codeMap = code
    this.code = res.code
    this.showMsg = showMsg
    // this.message()
    return res
  }

  // 主页面-列表-开启编制
  async openBudget (p, showMsg) {
    const code = {
      200: '加载成功',
      999: '令牌无效,请重新登录',
      2001: '参数非法'
    }
    const res = await post('/instance/openAnnualBudget', p)
    this.codeMap = code
    this.code = res.code
    this.showMsg = showMsg
    // this.message()
    return res
  }

  // 预算查看-总收入-列表
  async bizSumfeeList (p, showMsg) {
    const code = {
      200: '加载成功',
      999: '令牌无效,请重新登录',
      2001: '参数非法'
    }
    const res = await post('/bizSumfee/queryPage', p)
    this.codeMap = code
    this.code = res.code
    this.showMsg = showMsg
    // this.message()
    return res
  }
}

const ReadApi = new Service()

export default ReadApi
