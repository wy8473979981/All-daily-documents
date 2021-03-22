import { post } from '../interceptor'
import Base from './base'

class Element extends Base {
  async create (p, showMsg) {
    const code = {
      '200': '提交成功',
      '2001': '参数非法',
      '2008': '提交失败，元素key已存在',
      '2009': '提交失败，元素名称已存在'
    }
    const res = await post('/element/add', p, true)
    this.codeMap = code
    this.code = res.code
    this.showMsg = showMsg
    this.message()
    return res
  }

  async find (p, showMsg) {
    const code = {
      '200': '加载成功',
      '2001': '参数非法'
    }
    const res = await post('/element/list', p)
    this.codeMap = code
    this.code = res.code
    this.showMsg = showMsg
    // this.message()
    return res
  }

  async findById (p, showMsg) {
    const code = {
      '200': '加载成功',
      '2001': '参数非法',
      '2007': '数据不存在'
    }
    const res = await post('/element/load', p)
    this.codeMap = code
    this.code = res.code
    this.showMsg = showMsg
    // this.message()
    return res
  }

  async findLikeName (p, showMsg) {
    const code = {
      '200': '元素加载成功',
      '2001': '参数非法'
    }
    const res = await post('/element/getElementLikeName', p)
    this.codeMap = code
    this.code = res.code
    this.showMsg = showMsg
    this.message()
    return res
  }

  async update (p, showMsg) {
    const code = {
      '200': '更新成功',
      '2001': '参数非法',
      '2007': '数据不存在',
      '2009': '提交失败，元素名称已存在'
    }
    const res = await post('/element/update', p)
    this.codeMap = code
    this.code = res.code
    this.showMsg = showMsg
    this.message()
    return res
  }

  async del (p, showMsg) {
    const code = {
      '200': '删除成功',
      '2001': '参数非法',
      '2007': '数据不存在'
    }
    const res = await post('/element/del', p)
    this.codeMap = code
    this.code = res.code
    this.showMsg = showMsg
    this.message()
    return res
  }

  async restore (p, showMsg) {
    const code = {
      '200': '恢复成功',
      '2001': '参数非法',
      '2007': '数据不存在'
    }
    const res = await post('/element/renew', p)
    this.codeMap = code
    this.code = res.code
    this.showMsg = showMsg
    this.message()
    return res
  }
  // 根据cateid获取元素列表
  async findElementsByCateId (p, showMsg) {
    const code = {
      '200': '已根据指定分类加载元素'
    }
    const res = await post('/element/getElementByCateId', p)
    this.codeMap = code
    this.code = res.code
    this.showMsg = showMsg
    // this.message()
    return res
  }
}

const element = new Element()

export default element
