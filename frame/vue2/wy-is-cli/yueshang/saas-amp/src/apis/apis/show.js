import { get, post } from '../interceptor'
import Base from './base'

// 展示
class Show extends Base {
  // 资产分配情况列表
  async findllocation (p, showMsg) {
    const code = {
      '200': '加载成功',
      '999': '令牌无效,请重新登录',
      '2001': '参数非法'
    }
    const res = await post('/showDate/asset_allocation_list', p)
    this.codeMap = code
    this.code = res.code || 200
    this.showMsg = showMsg
    // this.message()
    return res
  }

  // 资产分配情况列表
  async findDetail (p, showMsg) {
    const code = {
      '200': '加载成功',
      '999': '令牌无效,请重新登录',
      '2001': '参数非法'
    }
    const res = await post('/showDate/asset_allocation_detail', p)
    this.codeMap = code
    this.code = res.code || 200
    this.showMsg = showMsg
    // this.message()
    return res
  }

  // 资产分配情况列表
  async findEntrust (p, showMsg) {
    const code = {
      '200': '加载成功',
      '999': '令牌无效,请重新登录',
      '2001': '参数非法'
    }
    const res = await post('/showDate/list', p)
    this.codeMap = code
    this.code = res.code || 200
    this.showMsg = showMsg
    // this.message()
    return res
  }
}

const show = new Show()

export default show
