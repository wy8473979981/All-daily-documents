import { get, post } from '../interceptor'
import Base from './base.js'

// 审批相关接口
class Approval extends Base {

  // 获取审批单模板及数据接口
  async getTemplateContentText (p, showMsg) {
    const res = await post('process/templateContent/getTemplateContentText', p)
    return res
  }

  // 审批详情
  async getApproveDetail (p, showMsg) {
    const res = await post('approve/getApproveDetail', p)
    return res
  }

  // 审批单追回
  async doRetrieve (p, showMsg) {
    const res = await post('approve/doRetrieve', p)
    return res
  }

  // 意见箱
  async suggesTionBox (p, showMsg) {
    const res = await post('approve/suggesTionBox', p)
    return res
  }

  // 查询已添加审批单推送人员
  async pushFindUserByApproveId (p, showMsg) {
    const res = await post('approve/push/findUserByApproveId', p)
    return res
  }
  
  // 审批推送
  async addApprovePush (p, showMsg) {
    const res = await post('approve/push/addApprovePush', p)
    return res
  }

  // 审批删除
  async deleteApproveById (p, showMsg) {
    const res = await post('approve/deleteApproveById', p)
    return res
  }

  // 获取审批状态reference
  async getApproveStatus (p, showMsg) {
    const res = await post('bs/dict/getApproveStatus', p)
    return res
  }

   // 保存并填写审批人获取审批步骤列表
  async getProcessStepByProcessId (p, showMsg) {
    const res = await post('approve/getProcessStepByProcessId', p)
    return res
  }

  // 审批发起
  async startFlow (p, showMsg) {
    const res = await post('approve/startFlow', p)
    return res
  }

  // 执行审批步骤
  async doStepFlow (p, showMsg) {
    const res = await post('approve/doStepFlow', p)
    return res
  }

  // 获取可驳回的步骤列表
  async getDenyStepList (p, showMsg) {
    const res = await post('approve/getDenyStepList', p)
    return res
  }

   // 上会
   async startMeeting (p, showMsg) {
    const res = await post('approve/startMeeting', p)
    return res
  }

  // 留言共享
  async saveApproveMessage (p, showMsg) {
    const res = await post('approve/message/saveApproveMessage', p)
    return res
  }

  // 获取留言信息
  async getApproveMessageList (p, showMsg) {
    const res = await post('approve/message/getApproveMessageList', p)
    return res
  }

  // 获取流程数据
  async getPmProcessFlow (p, showMsg) {
    const res = await post('process/template/getPmProcessFlow', p)
    return res
  }

  // 延期申请查询分页查询
  async findPmApproveDelayPage (p, showMsg) {
    const res = await post('approve/delay/findPmApproveDelayPage', p)
    return res
  }

  // 发起延期申请
  async savePmApproveDelay (p, showMsg) {
    const res = await post('approve/delay/savePmApproveDelay', p)
    return res
  }

  // 延期申请审批
  async doDelayFlow (p, showMsg) {
    const res = await post('approve/delay/doDelayFlow', p)
    return res
  }
  
  // 申请延期状态数据字典
  async getDelayDict (p, showMsg) {
    const res = await post('approve/delay/getDelayDict', p)
    return res
  }

  // 查询已添加共享人员
  async sharedFindUserByApproveId (p, showMsg) {
    const res = await post('approve/share/findUserByApproveId', p)
    return res
  }

  // 创建微信群
   async createWeChat (p, showMsg) {
    const res = await post('approve/createWeChat', p)
    return res
  }

  // 获取微信群成员列表
   async getWeChatUserList (p, showMsg) {
    const res = await post('approve/getWeChatUserList', p)
    return res
  }

  // 根据companyName查询公司名称下拉框
  async getCompanies (p, showMsg) {
    const res = await post('pdoldapi/budget/expend/companies', p)
    return res
  }

  // 印鉴使用会签单-人力资源-使用范围-下拉选项
  async getSealEngravingApplySheetHr (p, showMsg) {
    const res = await post('bs/dict/getSealEngravingApplySheetHr', p)
    return res
  }
  
  // 印鉴使用会签单-财务-使用范围
  async getSealEngravingApplySheetFin (p, showMsg) {
    const res = await post('bs/dict/getSealEngravingApplySheetFin', p)
    return res
  }

  // 申请提前解除合约-模糊查询合同编号下拉数据
  async getQuickSearchCont (p, showMsg) {
    const res = await post('abnormal/quickSearchCont', p)
    return res
  }

  // 资金申请表-宝龙集团资金申请表模糊查询下拉数据
  async getFinanceApplyOfBaoLong (p, showMsg) {
    const res = await post('financeApply/financeApplyOfBaoLong', p)
    return res
  }

  // 工程类垄断供方采购申请-招标计划编号模糊查询下拉数据
  async getFinCompanyList (p, showMsg) {
    const res = await post('costCtrlBid/finCompanyList', p)
    return res
  }

  // 工程类垄断供方采购申请-判断招标计划编号是否曾发起
  async isOnDataChainByEngineeNo (p, showMsg) {
    const res = await post('costCtrlBid/isOnDataChainByEngineeNo', p)
    return res
  }

  // 获取宝龙机构人员树
  async findBlOrgTree (p, showMsg) {
    const res = await post('bs/sysUser/findBlOrgTree', p)
    return res
  }

  // 模糊查询宝龙人员列表
  async getUserDetail (p, showMsg) {
    const res = await post('bs/sysUser/getUserDetail', p)
    return res
  }

  // 推送退回
  async doPushBack (p, showMsg) {
    const res = await post('approve/push/doPushBack', p)
    return res
  }

  // 给我
  async giveMe (p, showMsg) {
    const res = await post('approve/giveMe', p)
    return res
  }
}

const approval = new Approval()
export default approval
