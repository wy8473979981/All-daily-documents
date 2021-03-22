import { post } from '../interceptor'
import Base from './base'

// 竞品分析
class Product extends Base {
  // 查找
  async find (p, showMsg) {
    const code = {
      '200': '加载成功',
      '2001': '参数非法',
    }
    const res = await post('/cpa/list', p)
    this.codeMap = code
    this.code = res.code
    this.showMsg = showMsg
    // this.message()
    return res
  }
  async delList (p, showMsg) {
    const code = {
      '200': '提交成功',
      '2001': '参数非法',
      '2007': '数据不存在',
    }
    const res = await post('/cpa/del', p)
    this.codeMap = code
    this.code = res.code
    this.showMsg = showMsg
    this.message()
    return res
  }
  async findDetail (p, showMsg) {
    const code = {
      '200': '加载成功',
      '2001': '参数非法',
      '2007': '数据不存在',
    }
    const res = await post('/cpa/load', p)
    this.codeMap = code
    this.code = res.code
    this.showMsg = showMsg
    this.message()
    return res
  }

  // 新建
  async add (p, showMsg) {
    const code = {
      '200': '提交成功',
      '999': '令牌无效,请重新登录',
      '2001': '参数非法',
      '2009': '当前项目版本已存在，无法新增！',
    }
    const res = await post('/cpa/add', p)
    this.codeMap = code
    this.code = res.code
    this.showMsg = showMsg
    this.message()
    return res
  }

  // 更新
  async update (p, showMsg) {
    const code = {
      '200': '提交成功',
      '999': '令牌无效,请重新登录',
      '2001': '参数非法',
      '2009': '当前项目版本不存在，无法编辑！',
    }
    const res = await post('/cpa/update', p)
    this.codeMap = code
    this.code = res.code
    this.showMsg = showMsg
    this.message()
    return res
  }

}

const product = new Product()

export default product
