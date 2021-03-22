import { post } from '../interceptor'
import Base from './base'

// 地块信息
class Synthetical extends Base {
  // 查找
  async find (p, showMsg) {
    const code = {
      '200': '加载成功',
      '2001': '参数非法',
    }
    const res = await post('/analyse/list', p)
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
    const res = await post('/analyse/del', p)
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
    const res = await post('/analyse/load', p)
    this.codeMap = code
    this.code = res.code
    this.showMsg = showMsg
    this.message()
    return res
  }

  // 更新数据
  async edit (p, showMsg) {
    const code = {
      '200': '提交成功',
      '2001': '参数非法',
      '2007': '数据不存在',
    }
    const res = await post('/analyse/edit', p)
    this.codeMap = code
    this.code = res.code
    this.showMsg = showMsg
    this.message()
    return res
  }

  // 立即刷新
  async flush (p, showMsg) {
    const code = {
      '200': '提交成功',
      '999': '令牌无效,请重新登录',
      '2001': '参数非法',
      '2015': '更新失败',
    }
    const res = await post('/analyse/flush')
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
    const res = await post('/analyse/update', p)
    this.codeMap = code
    this.code = res.code
    this.showMsg = showMsg
    this.message()
    return res
  }

}

const synthetical = new Synthetical()

export default synthetical
