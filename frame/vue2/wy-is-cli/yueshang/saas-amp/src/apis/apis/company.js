import { post } from '../interceptor'
import Base from './base'

// 机构相关接口
class Company extends Base {
  // 创建机构
  async create (p, showMsg) {
    const code = {
      '200': '新增机构成功',
      '2001': '参数非法',
      '2009': '提交失败，机构简称已存在'
    }
    const res = await post('/company/add', p)
    this.codeMap = code
    this.code = res.code
    this.showMsg = showMsg
    this.message()
    return res
  }

  // 查找机构
  async find (p, showMsg) {
    const code = {
      '200': '机构加载成功',
      '2001': '参数非法'
    }
    const res = await post('/company/list', p)
    this.codeMap = code
    this.code = res.code
    this.showMsg = showMsg
    this.message()
    return res
  }

  // 根据机构id查找机构
  async findById (p, showMsg) {
    const code = {
      '200': '机构加载成功',
      '2001': '参数非法',
      '2007': '数据不存在'
    }
    const res = await post('/company/load', p)
    this.codeMap = code
    this.code = res.code
    this.showMsg = showMsg
    // this.message()
    return res
  }

  // 编辑机构
  async update (p, showMsg) {
    const code = {
      '200': '机构更新成功',
      '2001': '参数非法',
      '2007': '数据不存在',
      '2009': '更新失败，机构简称已存在'
    }
    const res = await post('/company/update', p)
    this.codeMap = code
    this.code = res.code
    this.showMsg = showMsg
    this.message()
    return res
  }

  // 删除机构
  async del (p, showMsg) {
    const code = {
      '200': '机构删除成功',
      '2001': '参数非法',
      '2007': '数据不存在'
    }
    const res = await post('/company/del', p)
    this.codeMap = code
    this.code = res.code
    this.showMsg = showMsg
    this.message()
    return res
  }

  // 恢复机构
  async restore (p, showMsg) {
    const code = {
      '200': '机构恢复成功',
      '2001': '参数非法',
      '2007': '数据不存在'
    }
    const res = await post('/company/renew', p)
    this.codeMap = code
    this.code = res.code
    this.showMsg = showMsg
    this.message()
    return res
  }

  // 查找所有打开的机构
  async findOpened (p, showMsg) {
    const code = {
      '200': '机构加载成功'
    }
    const res = await post('/company/getCompanyByOpened', p)
    this.codeMap = code
    this.code = res.code
    this.showMsg = showMsg
    // this.message()
    return res
  }

  // 根据机构简称查找机构
  async findByShortName (p, showMsg) {
    const code = {
      '200': '机构加载成功',
      '2001': '参数非法',
      '2007': '数据不存在'
    }
    const res = await post('/company/getCompanyByShortName', p)
    this.codeMap = code
    this.code = res.code
    this.showMsg = showMsg
    // this.message()
    return res
  }
}

const company = new Company()

export default company
