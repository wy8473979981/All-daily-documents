import { post } from '../interceptor'
import Base from './base'

class ElementGroup extends Base {
  async create (p, showMsg) {
    const code = {
      '200': '组合新增成功',
      '2001': '参数非法',
      '2008': '提交失败，元素组合KEY已存在',
      '2009': '提交失败，元素组合名称已存在'
    }
    const res = await post('/elementGroup/add', p)
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
    const res = await post('/elementGroup/list', p)
    this.codeMap = code
    this.code = res.code
    this.showMsg = showMsg
    // this.message()
    return res
  }

  // 根据组合类型查询组合列表
  async findByDataType (p, showMsg) {
    const code = {
      '200': '加载成功',
      '2001': '参数非法'
    }
    const res = await post('/elementGroup/getElementGroupByDataType', p)
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
    const res = await post('/elementGroup/load', p)
    this.codeMap = code
    this.code = res.code
    this.showMsg = showMsg
    // this.message()
    return res
  }

  async update (p, showMsg) {
    const code = {
      '200': '更新成功',
      '2001': '参数非法',
      '2007': '数据不存在',
      '2009': '更新失败，元素组合名称已存在'
    }
    const res = await post('/elementGroup/update', p)
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
    const res = await post('/elementGroup/del', p)
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
    const res = await post('/elementGroup/renew', p)
    this.codeMap = code
    this.code = res.code
    this.showMsg = showMsg
    this.message()
    return res
  }
}

const elementGroup = new ElementGroup()

export default elementGroup
