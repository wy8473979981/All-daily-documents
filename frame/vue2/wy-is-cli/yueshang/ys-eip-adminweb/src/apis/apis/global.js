import { get, post } from '../interceptor'
import Base from './base.js'

// 基础信息相关接口
class GlobalApi extends Base {
  // 常规分类数据
  async getOptions (p, showMsg) {
    const res = await get('/constData/list', p)
    const code = {
      '200': '加载成功',
      '999': '令牌无效,请重新登录',
    }
    this.codeMap = code
    this.code = res.code
    this.showMsg = showMsg
    // this.message()
    return res
  }
  // 项目名称
  async getProjectList (p, showMsg) {
    // {
    //   "project_id":"96",
    //   "project_name":"佛山新翼广场(碧乐时光)"
    // }
    const res = await post('/pms/project/list', p)
    const code = {
      '200': '加载成功',
      '999': '令牌无效,请重新登录',
      '2001': '参数非法',
    }
    this.codeMap = code
    this.code = res.code
    this.showMsg = showMsg
    // this.message()
    return res
  }
}

const globalApi = new GlobalApi()
export default globalApi
