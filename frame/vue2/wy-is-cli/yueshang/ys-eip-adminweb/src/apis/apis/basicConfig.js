import { get, post } from '../interceptor'
import Base from './base.js'

// 基础配置相关接口
class BasicConfig extends Base {
  // 获取日志查询列表数据
  async getProjectList (p, showMsg) {
    const res = await post('bs/log/findBsLogPage', p)
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

  // 序列号规则列表
  async getSerialList (p, showMsg) {
    const res = await post('bs/keySequence/findBsKeySequencePage', p)
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

  // 序列号规则详情
  async getSerialById (p, showMsg) {
    const res = await post('bs/keySequence/findBsKeySequenceById', p)
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

  // 序列号规则编辑
  async saveSerial (p, showMsg) {
    const res = await post('bs/keySequence/saveBsKeySequence', p)
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

  // 序列号规则删除
  async deleSerial (p, showMsg) {
    const res = await post('bs/keySequence/deleteBsKeySequence', p)
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

  // 内容模板配置列表
  async getBaseContentList (p, showMsg) {
    const res = await post('bs/keySequence/findBsTemplateConfigPage', p)
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

  // 内容模板配置详情
  async getBaseContentById (p, showMsg) {
    const res = await post('bs/keySequence/findBsTemplageConfigById', p)
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

  // 内容模板配置删除
  async deleBaseContent (p, showMsg) {
    const res = await post('bs/keySequence/deleteBsTemplageConfig', p)
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

   // 内容模板配置编辑
   async saveBaseContent (p, showMsg) {
    const res = await post('bs/keySequence/saveBsTemplageConfig', p)
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

  // 数据字典列表
  async getDataList (p, showMsg) {
    const res = await post('bs/dict/findBsDictTypePage', p)
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

  // 数据字典详情
  async getDataById (p, showMsg) {
    const res = await post('bs/dict/findBsDictById', p)
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

  // 数据字典删除
  async deleData (p, showMsg) {
    const res = await post('bs/dict/deleteBsDictType', p)
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

  // 根据id删除数据字典
  async deleteDictDataById (p, showMsg) {
    const res = await post('bs/dict/deleteDictDataById', p)
    return res
  }

  // 数据字典编辑
  async saveData (p, showMsg) {
    const res = await post('bs/dict/saveBsDictType', p)
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
  

  // 列表下载导入模板
  async downLoad (p, showMsg) {
    const res = await get('/project/down', p)
    const code = {
      '200': '加载成功',
      '999': '令牌无效,请重新登录',
      '2001': '参数非法'
    }
    this.codeMap = code
    this.code = res.code
    this.showMsg = showMsg
    this.message()
    return res
  }

  // 刷新数据字典缓存
  async refreshBsDictCache (p, showMsg) {
    const res = await post('refresh/task/refreshBsDictCache', p)
    const code = {
      '200': '刷新成功',
    }
    this.codeMap = code
    this.code = res.code
    this.showMsg = showMsg
    // this.message()
    return res
  }

  // 刷新数据中心审批单同步任务
  async refreshElasticSearchPush (p, showMsg) {
    const res = await post('refresh/task/refreshElasticSearchPush', p)
    const code = {
      '200': '刷新成功',
    }
    this.codeMap = code
    this.code = res.code
    this.showMsg = showMsg
    // this.message()
    return res
  }

  // 刷新模块缓存
  async refreshModuleCache (p, showMsg) {
    const res = await post('refresh/task/refreshModuleCache', p)
    const code = {
      '200': '刷新成功',
    }
    this.codeMap = code
    this.code = res.code
    this.showMsg = showMsg
    // this.message()
    return res
  }

  // 刷新人员机构缓存
  async refreshOrgAndUserCache (p, showMsg) {
    const res = await post('refresh/task/refreshOrgAndUserCache', p)
    const code = {
      '200': '刷新成功',
    }
    this.codeMap = code
    this.code = res.code
    this.showMsg = showMsg
    // this.message()
    return res
  }

  // 刷新流程和节点缓存
  async refreshProcessAndNodeCache (p, showMsg) {
    const res = await post('refresh/task/refreshProcessAndNodeCache', p)
    const code = {
      '200': '刷新成功',
    }
    this.codeMap = code
    this.code = res.code
    this.showMsg = showMsg
    // this.message()
    return res
  }

  // 刷新模板和模板内容缓存
  async refreshTemplateCache (p, showMsg) {
    const res = await post('refresh/task/refreshTemplateCache', p)
    const code = {
      '200': '刷新成功',
    }
    this.codeMap = code
    this.code = res.code
    this.showMsg = showMsg
    // this.message()
    return res
  }
}

const basicConfig = new BasicConfig()
export default basicConfig
