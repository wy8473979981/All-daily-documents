import { get, post } from '../interceptor'
import Base from './base.js'

// 流程管理相关接口
class FlowManange extends Base {
  // 模板内容配置列表
  async getTempContentList (p, showMsg) {
    const res = await post('process/templateContent/findPmTemplateContentPage', p)
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

  // 模板内容配置详情
  async getTempContentById (p, showMsg) {
    const res = await post('process/templateContent/findPmTemplateContentById', p)
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

  // 模板内容配置编辑
  async saveTempContent (p, showMsg) {
    const res = await post('process/templateContent/savePmTemplateContent', p)
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

  // 模板内容配置删除
  async deleTempContent (p, showMsg) {
    const res = await post('process/templateContent/deletePmTemplateContent', p)
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

  // 模板配置列表
  async getTempList (p, showMsg) {
    const res = await post('process/template/findPmTemplatePage', p)
    const code = {
      '1': '加载成功',
      '999': '令牌无效,请重新登录',
      '2001': '参数非法'
    }
    this.codeMap = code
    this.code = res.code
    this.showMsg = showMsg
    // this.message()
    return res
  }

  // 模板配置详情
  async getTempById (p, showMsg) {
    const res = await post('process/template/findTemplateById', p)
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

   // 模板配置编辑
   async saveTemp (p, showMsg) {
    const res = await post('process/template/savePmTemplate', p)
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

  // 模板配置-模板内容下拉
  async getTempReference (p, showMsg) {
    const res = await post('process/templateContent/getTemplateContentOption', p)
    return res
  }

  // 模板配置删除
  async deleTemp (p, showMsg) {
    const res = await post('process/template/deletePmTemplate', p)
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

  // 节点配置列表
  async getNodeList (p, showMsg) {
    const res = await post('process/node/findPmProcessNodePage', p)
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

  // 节点配置详情
  async getNodeById (p, showMsg) {
    const res = await post('process/node/findPmProcessNodeById', p)
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

   // 节点配置编辑
   async saveNode (p, showMsg) {
    const res = await post('process/node/savePmProcessNode', p)
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

  // 节点配置删除
  async deleNode (p, showMsg) {
    const res = await post('process/node/deletePmProcessNode', p)
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

  // 推送，查询，共享，发起，配置列表
  async getAccessList (p, showMsg) {
    const res = await post('process/access/findProcessAccessPage', p)
    return res
  }

   // 推送，查询，共享，发起，配置详情
   async getAccessById (p, showMsg) {
    const res = await post('process/access/findByAccessId', p)
    return res
  }

  // 推送，查询，共享，发起，配置编辑
  async saveAccess (p, showMsg) {
    const res = await post('process/access/saveProcessAccess', p)
    return res
  }

  // 推送，查询，共享，发起，配置删除
  async deleAccess (p, showMsg) {
    const res = await post('process/access/deleteByAccessIds', p)
    return res
  }

  // 流程属性配置列表
  async getFormList (p, showMsg) {
    const res = await post('process/applySet/findPmApplySetPage', p)
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

  // 流程属性配置详情
  async getFormById (p, showMsg) {
    const res = await post('process/applySet/findPmApplySetById', p)
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

   // 流程属性配置编辑
   async saveForm (p, showMsg) {
    const res = await post('process/applySet/savePmApplySet', p)
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

  // 流程属性配置删除
  async deleForm (p, showMsg) {
    const res = await post('process/applySet/deletePmApplySet', p)
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

  // 表单属性配置列表
  async findTemplatePropPage (p, showMsg) {
    const res = await post('process/templateProp/findTemplatePropPage', p)
    return res
  }

  // 表单属性配置详情
  async findTemplatePropById (p, showMsg) {
    const res = await post('process/templateProp/findTemplatePropById', p)
    return res
  }

  // 表单属性配置编辑
  async saveTemplateProp (p, showMsg) {
    const res = await post('process/templateProp/saveTemplateProp', p)
    return res
  }

  // 批量导入属性
  async importBeanField (p, showMsg) {
    const res = await post('process/templateProp/importBeanField', p)
    return res
  }

  // 表单属性配置删除
  async deleteByPropIds (p, showMsg) {
    const res = await post('process/templateProp/deleteByPropIds', p)
    return res
  }

}

const flowManange = new FlowManange()
export default flowManange
