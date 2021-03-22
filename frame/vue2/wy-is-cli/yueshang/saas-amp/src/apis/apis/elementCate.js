import { post } from '../interceptor'
import Base from './base'

class ElementCate extends Base {
  async create (p, showMsg) {
    const code = {
      '200': '提交成功',
      '2001': '参数非法',
      '2008': '提交失败，元素分类KEY已存在',
      '2009': '提交失败，元素分类名称已存在'
    }
    const res = await post('/elementCate/add', p)
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
    const res = await post('/elementCate/list', p)
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
    const res = await post('/elementCate/load', p)
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
      '2009': '提交失败，元素分类名称已存在',
      '2010': '提交失败，默认分类不可编辑'
    }
    const res = await post('/elementCate/update', p)
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
      '2007': '数据不存在',
      '2011': '删除失败，默认分类不可删除'
    }
    const res = await post('/elementCate/del', p)
    this.codeMap = code
    this.code = res.code
    this.showMsg = showMsg
    this.message()
    return res
  }
  async findOpened (p, showMsg) {
    const code = {
      '200': '查询元素分类成功'
    }
    const res = await post('/elementCate/getElementCateByOpened', p)
    this.codeMap = code
    this.code = res.code
    this.showMsg = showMsg
    // this.message()
    return res
  }

  async restore (p, showMsg) {
    const code = {
      '200': '恢复元素分类成功',
      '2001': '参数非法',
      '2007': '数据不存在',
      '2012': '恢复失败，默认分类无需恢复'
    }
    const res = await post('/elementCate/renew', p)
    this.codeMap = code
    this.code = res.code
    this.showMsg = showMsg
    this.message()
    return res
  }
}

const elementCate = new ElementCate()

export default elementCate
