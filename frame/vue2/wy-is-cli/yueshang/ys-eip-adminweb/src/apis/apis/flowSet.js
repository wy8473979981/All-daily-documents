import { get, post } from '../interceptor'
import Base from './base.js'

// 流程配置相关接口
class FlowSet extends Base {

  // 基础配置详情
  async getBaseById (p, showMsg) {
    const res = await post('process/findPmProcessByVo', p)
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

  // 导入pd配置
  async importConfig (p, showMsg) {
    const res = await post('pdConfig/importConfig', p)
    return res
  }

  // 基础配置编辑
  async saveBase (p, showMsg) {
    const res = await post('process/savePmProcess', p)
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

  // 描述配置列表
  async getMsgList (p, showMsg) {
    const res = await post('process/msg/findPmProcessMsgPage', p)
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

  // 描述配置详情
  async getMsgById (p, showMsg) {
    const res = await post('process/msg/findByPmProcssMsgId', p)
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

  // 描述配置编辑
  async saveMsg (p, showMsg) {
    const res = await post('process/msg/savePmProcessMsg', p)
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
  async deleMsg (p, showMsg) {
    const res = await post('process/msg/deleteByMsgIds', p)
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

   // 条件配置列表
   async getConditionList (p, showMsg) {
    const res = await post('process/template/findPmProcessConditionPage', p)
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

  // 条件配置详情
  async getConditionById (p, showMsg) {
    const res = await post('process/template/findPmProcessConditonById', p)
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

  // 条件配置编辑
  async saveCondition (p, showMsg) {
    const res = await post('process/template/savePmProcessCondition', p)
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

   // 根据流程ID查询表单属性配置项
   async getTemplateProp (p, showMsg) {
    const res = await post('process/templateProp/findByProcessId', p)
    return res
  }

  // 条件配置删除
  async deleCondition (p, showMsg) {
    const res = await post('process/template/deleteByConditionIds', p)
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

  // 获取流程图数据
  async getPmProcessFlow (p, showMsg) {
    const res = await post('process/template/getPmProcessFlow', p)
    return res
  }

  // 审批步骤列表
  async getStepList (p, showMsg) {
    const res = await post('process/step/findPmProcessStepPage', p)
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

  // 获取表单下的所有节点过滤当前节点
  async getProcessStepList (p, showMsg) {
    const res = await post('process/step/getProcessStepList', p)
    return res
  }

  // 审批步骤详情
  async getStepById (p, showMsg) {
    const res = await post('process/step/findByProcessStepId', p)
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

  // 审批步骤编辑
  async saveStep (p, showMsg) {
    const res = await post('process/step/savePmProcessStep', p)
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

  // 审批步骤批量编辑
  async saveStepBath (p, showMsg) {
    const res = await post('process/step/editProcessStepBath', p)
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

  // 审批步骤删除
  async deleStep (p, showMsg) {
    const res = await post('process/step/deleteByStepIds', p)
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

  // 额外节点列表
  async getExtraNodeList (p, showMsg) {
    const res = await post('process/autoStep/findPmProcessAutoStepList', p)
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

  // 额外节点详情
  async getExtraNodeById (p, showMsg) {
    const res = await post('process/autoStep/findByPmProcessAutoStepId', p)
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

  // 额外节点编辑
  async saveExtraNode (p, showMsg) {
    const res = await post('process/autoStep/savePmProcessAutoStep', p)
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

  // 额外节点删除
  async deleExtraNode (p, showMsg) {
    const res = await post('process/autoStep/deleteByAutoStepIds', p)
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

  // 复制基础配置
  async copyPmProcess (p, showMsg) {
    const res = await post('process/copyPmProcess', p)
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

  // 复制流程配置
  async copyPmProcessCondition (p, showMsg) {
    const res = await post('process/template/copyPmProcessCondition', p)
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
}

const flowSet = new FlowSet()
export default flowSet
