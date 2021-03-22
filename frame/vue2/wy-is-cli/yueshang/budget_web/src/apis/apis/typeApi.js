import { get, post } from '../interceptor'
import Base from './base'

// 类型配置-存量资产
class TypeApi extends Base {
  // 查找
  async find (p, showMsg) {
    const code = {
      200: '加载成功',
      999: '令牌无效,请重新登录',
      2001: '参数非法'
    }
    const res = await post('/bizHrfee/queryPage', p)
    this.codeMap = code
    this.code = res.code
    this.showMsg = showMsg
    // this.message()
    return res
  }

  // 删除
  async del (p, showMsg) {
    const code = {
      200: '删除成功',
      999: '令牌无效,请重新登录',
      2001: '参数非法',
      2004: '该项目上传过数据，不能被删除'
    }
    const res = await post('/projectConfig/del', p)
    this.codeMap = code
    this.code = res.code
    this.showMsg = showMsg
    this.message()
    return res
  }

  // 新建
  async add (p, showMsg) {
    const code = {
      200: '提交成功',
      999: '令牌无效,请重新登录',
      2001: '参数非法',
      2003: '该项目已经存在，不能重复添加'
    }
    const res = await post('/projectConfig/add', p)
    this.codeMap = code
    this.code = res.code
    this.showMsg = showMsg
    this.message()
    return res
  }

  // 编辑
  async edit (p, showMsg) {
    const code = {
      200: '提交成功',
      999: '令牌无效,请重新登录',
      2001: '参数非法',
      2003: '该项目已经存在，不能重复添加'
    }
    const res = await post('/projectConfig/edit', p)
    this.codeMap = code
    this.code = res.code
    this.showMsg = showMsg
    this.message()
    return res
  }

  // 存量在建项目下拉框
  async projectDropDown (p, showMsg) {
    const code = {
      200: '加载成功',
      999: '令牌无效,请重新登录',
      2001: '参数非法'
    }
    const res = await post('/projectConfig/projectDropDown', p)
    this.codeMap = code
    this.code = res.code
    this.showMsg = showMsg
    // this.message()
    return res
  }

  // 类型下拉框
  async typeDropDown (p, showMsg) {
    const code = {
      200: '加载成功',
      999: '令牌无效,请重新登录',
      2001: '参数非法'
    }
    const res = await post('/projectConfig/typeDropDown', p)
    this.codeMap = code
    this.code = res.code
    this.showMsg = showMsg
    // this.message()
    return res
  }

  // 新增项目名称请求宝龙数据接口下拉
  async projectBl (p, showMsg) {
    const code = {
      200: '加载成功',
      999: '令牌无效,请重新登录',
      2001: '参数非法'
    }
    const res = await post('/projectConfig/projectBl', p)
    this.codeMap = code
    this.code = res.code
    this.showMsg = showMsg
    // this.message()
    return res
  }

  // 宝龙成员树状列表
  async userDropDown (p, showMsg) {
    const code = {
      200: '加载成功',
      999: '令牌无效,请重新登录',
      2001: '参数非法'
    }
    const res = await post('/projectConfig/user_drop_down', p)
    this.codeMap = code
    this.code = res.code
    this.showMsg = showMsg
    // this.message()
    return res
  }

  // 成员新增
  async userAdd (p, showMsg) {
    const code = {
      200: '加载成功',
      999: '令牌无效,请重新登录',
      2001: '参数非法',
      2009: '重复添加'
    }
    const res = await post('/projectConfig/user_add', p)
    this.codeMap = code
    this.code = res.code
    this.showMsg = showMsg
    this.message()
    return res
  }

  // 成员删除
  async userDel (p, showMsg) {
    const code = {
      200: '加载成功',
      999: '令牌无效,请重新登录',
      2001: '参数非法'
    }
    const res = await post('/projectConfig/user_del', p)
    this.codeMap = code
    this.code = res.code
    this.showMsg = showMsg
    this.message()
    return res
  }

  // 成员列表
  async userList (p, showMsg) {
    const code = {
      200: '加载成功',
      999: '令牌无效,请重新登录',
      2001: '参数非法'
    }
    const res = await post('/projectConfig/user_list', p)
    this.codeMap = code
    this.code = res.code
    this.showMsg = showMsg
    // this.message()
    return res
  }

  // 在建资产同步
  async synch (p, showMsg) {
    const res = await get('/projectConfig/synch', p)
    const code = {
      200: '同步成功',
      999: '令牌无效,请重新登录',
      2001: '参数非法',
      2008: '同步失败'
    }
    this.codeMap = code
    this.code = res.code
    this.showMsg = showMsg
    this.message()
    return res
  }

  // 获取省市区
  async cityList (p, showMsg) {
    const code = {
      200: '加载成功',
      999: '令牌无效,请重新登录',
      2001: '参数非法'
    }
    const res = await post('/projectConfig/three_level_link', p)
    this.codeMap = code
    this.code = res.code
    this.showMsg = showMsg
    // this.message()
    return res
  }
}

const typeApi = new TypeApi()

export default typeApi
