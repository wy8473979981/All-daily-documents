import { get, post } from '../interceptor'
import Base from './base.js'

// 模块树相关接口
class ModuleTree extends Base {
  // 模块树列表
  async getModuleTreeList (p, showMsg) {
    const res = await post('process/module/findPmModuleTree', p)
    const code = {
      '200': '加载成功',
      '999': '令牌无效,请重新登录',
      '2001': '参数非法'
    }
    this.codeMap = code
    this.code = res.code
    this.showMsg = showMsg
    // this.message()
    return res
  }

  // 模块树详情
  async getModuleTreeById (p, showMsg) {
    const res = await post('process/module/findPmModuleById', p)
    const code = {
      '200': '提交成功',
      '999': '令牌无效,请重新登录',
      '2001': '参数非法',
      '2007': '数据不存在'
    }
    this.codeMap = code
    this.code = res.code
    this.showMsg = showMsg
    // this.message()
    return res
  }

  // 模块树编辑
  async saveModuleTree (p, showMsg) {
    const res = await post('process/module/savePmModule', p)
    const code = {
      '200': '提交成功',
      '999': '令牌无效,请重新登录',
      '2001': '参数非法',
      '2007': '数据不存在'
    }
    this.codeMap = code
    this.code = res.code
    this.showMsg = showMsg
    // this.message()
    return res
  }

  // 模块树删除
  async deleModuleTree (p, showMsg) {
    const res = await post('process/module/deletePmModuleById', p)
    const code = {
      '200': '提交成功',
      '999': '令牌无效,请重新登录',
      '2001': '参数非法',
      '2007': '数据不存在'
    }
    this.codeMap = code
    this.code = res.code
    this.showMsg = showMsg
    // this.message()
    return res
  }

  // 分类管理列表
  async getProcessList (p, showMsg) {
    const res = await post('process/module/findPmModulePageById', p)
    const code = {
      '200': '加载成功',
      '999': '令牌无效,请重新登录',
      '2001': '参数非法'
    }
    this.codeMap = code
    this.code = res.code
    this.showMsg = showMsg
    // this.message()
    return res
  }

  // 分类管理详情
  async getProcessDetail (p, showMsg) {
    const res = await post('process/findPmProcessByVo', p)
    const code = {
      '200': '加载成功',
      '999': '令牌无效,请重新登录',
      '2001': '参数非法'
    }
    this.codeMap = code
    this.code = res.code
    this.showMsg = showMsg
    // this.message()
    return res
  }

  // 分类管理编辑
  async saveProcess (p, showMsg) {
    const res = await post('process/savePmProcess', p)
    const code = {
      '200': '加载成功',
      '999': '令牌无效,请重新登录',
      '2001': '参数非法'
    }
    this.codeMap = code
    this.code = res.code
    this.showMsg = showMsg
    // this.message()
    return res
  }

  // 分类管理编辑选择模块下拉
  async getModuleReference (p, showMsg) {
    const res = await post('process/module/getModuleTree', p)
    const code = {
      '200': '加载成功',
      '999': '令牌无效,请重新登录',
      '2001': '参数非法'
    }
    this.codeMap = code
    this.code = res.code
    this.showMsg = showMsg
    // this.message()
    return res
  }

  // 分类管理删除
  async deleProcess (p, showMsg) {
    const res = await post('process/deleteByPmProcesIds', p)
    const code = {
      '200': '加载成功',
      '999': '令牌无效,请重新登录',
      '2001': '参数非法'
    }
    this.codeMap = code
    this.code = res.code
    this.showMsg = showMsg
    // this.message()
    return res
  }

}

const moduleTree = new ModuleTree()
export default moduleTree
