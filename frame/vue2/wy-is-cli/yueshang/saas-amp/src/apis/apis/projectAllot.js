import { post } from '../interceptor'
import Base from './base'

// 资产汇总
class ProjectAllot extends Base {
  // 同步
  async synch (p, showMsg) {
    const code = {
      '200': '加载成功',
      '999': '令牌无效,请重新登录',
      '2001': '参数非法',
    }
    const res = await post('/userBl/synch', p)
    this.codeMap = code
    this.code = res.code
    this.showMsg = showMsg
    // this.message()
    return res
  }

  // 查找
  async find (p, showMsg) {
    const code = {
      '200': '加载成功',
      '999': '令牌无效,请重新登录',
      '2001': '参数非法',
    }
    const res = await post('/userBl/list', p)
    this.codeMap = code
    this.code = res.code
    this.showMsg = showMsg
    // this.message()
    return res
  }

  // 关联项目列表
  async project_list (p, showMsg) {
    const code = {
      '200': '加载成功',
      '999': '令牌无效,请重新登录',
      '2001': '参数非法',
    }
    const res = await post('/userBl/project_list', p)
    this.codeMap = code
    this.code = res.code
    this.showMsg = showMsg
    // this.message()
    return res
  }

  // 关联项目保存
  async project_save (p, showMsg) {
    const code = {
      '200': '加载成功',
      '999': '令牌无效,请重新登录',
      '2001': '参数非法',
    }
    const res = await post('/userBl/project_save', p)
    this.codeMap = code
    this.code = res.code
    this.showMsg = showMsg
    this.message()
    return res
  }
}

const projectAllot = new ProjectAllot()

export default projectAllot
