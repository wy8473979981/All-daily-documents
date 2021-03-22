import { get, post } from '../interceptor'
import Base from './base.js'

// 基础信息相关接口
class GlobalApi extends Base {
  // 非通用表下拉选择数据
  async getSelectList(p, showMsg) {
    const res = await get('/selectData', p)
    const code = {
      200: '加载成功',
      999: '令牌无效,请重新登录'
    }
    this.codeMap = code
    this.code = res.code
    this.showMsg = showMsg
    // this.message()
    return res
  }

  // 通用表下拉选择数据（业态，渠道）
  async getBizTypeList(p, showMsg) {
    const res = await get('/subject/getPulldownList', p)
    const code = {
      200: '加载成功',
      999: '令牌无效,请重新登录'
    }
    this.codeMap = code
    this.code = res.code
    this.showMsg = showMsg
    // this.message()
    return res
  }

  async getSubjectByParentIdAndLevel(p, showMsg) {
    const res = await get('/subject/getSubjectByParentIdAndLevel', p)
    const code = {
      200: '加载成功',
      999: '令牌无效,请重新登录'
    }
    this.codeMap = code
    this.code = res.code
    this.showMsg = showMsg
    // this.message()
    return res
  }

  // 通用费用表
  async find(p, showMsg) {
    const code = {
      200: '加载成功',
      999: '令牌无效,请重新登录',
      2001: '参数非法'
    }
    const res = await post('/bizFee/queryPage', p)
    this.codeMap = code
    this.code = res.code
    this.showMsg = showMsg
    // this.message()
    return res
  }

  // 项目名称
  async getProjectList(p, showMsg) {
    // {
    //   "project_id":"96",
    //   "project_name":"佛山新翼广场(碧乐时光)"
    // }
    const res = await post('/pms/project/list', p)
    const code = {
      200: '加载成功',
      999: '令牌无效,请重新登录',
      2001: '参数非法'
    }
    this.codeMap = code
    this.code = res.code
    this.showMsg = showMsg
    // this.message()
    return res
  }


  // 导入
  async excelImport(p, url, showMsg) {
    const code = {
      '0': '导入成功',
    }
    const res = await post(url, p)
    this.codeMap = { ...{ [res.code]: res.msg }, ...code }
    this.code = res.code
    this.showMsg = showMsg
    this.message()
    return res
  }

  // 导出
  async excelExport(p, url, showMsg) {
    const res = await get(url, p, 'arraybuffer')
    return res
  }
}

const globalApi = new GlobalApi()
export default globalApi
