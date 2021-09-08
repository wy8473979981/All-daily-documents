import { get, post } from '../interceptor'
import Base from './base.js'

// 下拉相关接口
class Reference extends Base {

  // 审批信息审批状态下拉
  async getApproveStatus (p, showMsg) {
    const res = await post('bs/dict/getApproveStatus', p)
    return res
  }

   // 数据通知通知状态下拉
   async getApproveDatePushStatus (p, showMsg) {
    const res = await post('bs/dict/getApproveDatePushStatus', p)
    return res
  }

  // 获取流程描述
  async findPmProcessMsgPage (p, showMsg) {
    const res = await post('process/msg/findPmProcessMsgPage', p)
    return res
  }

  // 模糊查询流程分类下拉
  async getProcessList (p, showMsg) {
    const res = await post('findPmProcessParam', p)
    return res
  }

  // 根据流程id获取条件下拉
  async getStepByProcessId (p, showMsg) {
    const res = await post('getStepByProcessId', p)
    return res
  }


  // 获取节点标签节点类型下拉
  async getNodeLabelList (p, showMsg) {
    const res = await post('getProcessNodeDict', p)
    return res
  }

   // 获取模板下拉
   async getTempList (p, showMsg) {
    const res = await post('getTemplateOption', p)
    return res
  }

  // 获取节点组下拉
  async getGroupNode (p, showMsg) {
    const res = await post('getGroupNode', p)
    return res
  }

  // 获取一二级下拉
  async getStepRank (p, showMsg) {
    const res = await post('getStepRank', p)
    return res
  }

  // 获取审批时限下拉
  async getTimeLimit (p, showMsg) {
    const res = await post('getTimeLimit', p)
    return res
  }

   // 获取关联节点下拉
   async getParentStep (p, showMsg) {
    const res = await post('getParentStep', p)
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

  // 获取当前人员机构人员列表

  async findMyDeptUserList (p, showMsg) {
    const res = await post('bs/sysUser/findMyDeptUserList', p)
    return res
  }

  // 获取目标成本科目树
  async getCostTree (p, showMsg) {
    const res = await post('bizpaychargeotherbill/loadCostTypeTree', p)
    return res
  }
    // 二级设备

    async selectAssmModel (p, showMsg) {
      const res = await post('fixedAssetsApplyForSygs/selectAssmModel', p)
      return res
    }
  
    // 三级设备
  
    async selectAssmModelByParentId (p, showMsg) {
      const res = await post('fixedAssetsApplyForSygs/selectAssmModelByParentId', p)
      return res
    }
}

const reference = new Reference()
export default reference
