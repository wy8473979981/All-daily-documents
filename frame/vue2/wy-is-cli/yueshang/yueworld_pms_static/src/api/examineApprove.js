/*
 * @Author: xueyx
 * @LastEditors: xueyx
 * @Description: 开业审批接口
 */
import { Api } from '@/utils/api'

export class ApproveApi extends Api {
    // 获取开业审批列表
    bisExamineApprove = (param) => {
      return this.post('/mock/26/pms/bisExamineApprove/list', param)
    }
    // 获取开业审批详情页
    bisExamineApproveDetail = (param) => {
      return this.post('/mock/26/pms/bisExamineApprove/details', param)
    }
    // 获取合同编号list
    bisContractList = (param) => {
      return this.post('/mock/26/pms/contractsList', param)
    }
    // 暂存，发起审核按钮
    bisApproveAdd = (param) => {
      return this.post('/mock/26/pms/bisExamineApprove/add', param)
    }
    // 列表页删除按钮
  approveDeleteList = (param) => {
    return this.post('/mock/26/pms/bisExamineApprove/delete', param)
  }
  // 获取规划人员planner数据树
  getPlannerTree=(param) => {
    return this.post('/mock/26/pms/plannerTreeList', param)
  }
  // 获取编号
  getProgramList=(param) => {
    return this.post('/mock/26/pms/chooseProgramNameList', param)
  }

  // 财务管理-应收明细list
  getReceivableFiniteList=(param) => {
    return this.post('/mock/26/pms/receivableDefiniteList', param)
  }
  // 财务管理-欠费平台list
  getDuePlatform=(param) => {
    return this.post('/mock/26/pms/duePlatform/list', param)
  }
   // 财务管理-欠费明细list
   getDuePlatformDetail=(param) => {
     return this.post('/mock/26/pms/duePlatformDetail/list', param)
   }
   // 财务管理-欠费明细推送滞纳金
   getDuePlatformPush=(param) => {
     return this.post('/mock/26/pms/duePlatformDetail/pushZ', param)
   }
    // 财务管理-应收账单-历史账单
    getReceivableHistory=(param) => {
      return this.post('/mock/26/pms/receivableHistory', param)
    }
    // 财务管理-应收账单-应收减免
    getReceivableLightlyList=(param) => {
      return this.post('/mock/26/pms/receivableLightlyList', param)
    }
    // 财务管理-应收账单-应收减免详情
    getReceivableLightlyDetail=(param) => {
      return this.post('/mock/26/pms/receivableLightlyList/detail', param)
    }
    // 财务管理-应收账单-新增合同类型
    getAddContractList=(param) => {
      return this.post('/mock/26/pms/receivableLightlyList/contractlist', param)
    }
    // 财务管理-应收账单-应收list
    getReceivableDueformlist=(param) => {
      return this.post('/mock/26/pms/receivable/dueformlist', param)
    }
}

export const approveApi = new ApproveApi()
