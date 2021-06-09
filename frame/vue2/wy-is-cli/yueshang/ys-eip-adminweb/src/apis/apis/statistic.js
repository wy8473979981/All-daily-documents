import { get, post } from '../interceptor'
import Base from './base.js'

// 统计查询相关接口
class Statistic extends Base {

  // 审批过期记录查询列表
  async findHistoryPage (p, showMsg) {
    const res = await post('approve/history/findHistoryPage', p)
    return res
  }
  
  // 审批过期记录查询详情
  async findHistoryDetailsPage (p, showMsg) {
    const res = await post('approve/history/findHistoryDetailsPage', p)
    return res
  }

  // 审批过期记录详情取消时限
  async cancelLimitTime (p, showMsg) {
    const res = await post('approve/history/cancelLimitTime', p)
    return res
  }

  // 审批过期记录删除
  async deleteApproveHistory (p, showMsg) {
    const res = await post('approve/history/deleteApproveHistory', p)
    return res
  }

}

const statistic = new Statistic()
export default statistic
