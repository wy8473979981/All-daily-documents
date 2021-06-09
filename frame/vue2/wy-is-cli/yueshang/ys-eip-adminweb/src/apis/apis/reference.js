import { get, post } from '../interceptor'
import Base from './base.js'

// 下拉相关接口
class Reference extends Base {

  // 审批信息审批状态下拉
  async getApproveStatus (p, showMsg) {
    // const res = await post('bs/dict/getApproveStatus', p)
    // return res
  }

   // 数据通知通知状态下拉
   async getApproveDatePushStatus (p, showMsg) {
    const res = await post('bs/dict/getApproveDatePushStatus', p)
    return res
  }

  // 模糊查询流程分类下拉
  async getProcessList (p, showMsg) {
    const res = await post('process/findPmProcessParam', p)
    return res
  }

  // 模糊查询流程条件
  async findPmProcessConditionLike (p, showMsg) {
    const res = await post('process/template/findPmProcessConditionLike', p)
    return res
  }

   // 模糊查询审批步骤
   async findPmProcessStepLike (p, showMsg) {
    const res = await post('process/step/findPmProcessStepLike', p)
    return res
  }

  // 根据流程id获取条件下拉
  async getStepByProcessId (p, showMsg) {
    const res = await post('process/step/getStepByProcessId', p)
    return res
  }


  // 获取节点标签节点类型下拉
  async getNodeLabelList (p, showMsg) {
    const res = await post('bs/dict/getProcessNodeDict', p)
    return res
  }

   // 获取模板下拉
   async getTempList (p, showMsg) {
    const res = await post('process/template/getTemplateOption', p)
    return res
  }

  // 获取节点组下拉
  async getGroupNode (p, showMsg) {
    const res = await post('process/node/getGroupNode', p)
    return res
  }

  // 获取一二级下拉
  async getStepRank (p, showMsg) {
    const res = await post('process/step/getStepRank', p)
    return res
  }

  // 获取审批时限下拉
  async getTimeLimit (p, showMsg) {
    const res = await post('process/step/getTimeLimit', p)
    return res
  }

   // 获取关联节点下拉
   async getParentStep (p, showMsg) {
    const res = await post('process/step/getParentStep', p)
    return res
  }

  // 获取人员查询数据
  // async getUserSerachList (p, showMsg) {
  //   const res = await post('findSysUser', p)
  //   return res
  // }
  async getUserSerachList (p, showMsg) {
    const res = await post('bs/sysUser/findSysUserSearch', p)
    return res
  }

  // 获取机构树
  // async getOrgTree (p, showMsg) {
  //   const res = await post('getSysOrgTree', p)
  //   return res
  // }
  async getOrgTree (p, showMsg) {
    const res = await post('bs/sysOrg/getSysOrgTreeAdmin', p)
    return res
  }

  // 获取流程类型字典
  async getProcessTypeDict (p, showMsg) {
    const res = await post('bs/dict/getProcessTypeDict', p)
    return res
  }
}

const reference = new Reference()
export default reference
