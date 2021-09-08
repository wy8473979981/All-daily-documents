import { get, post } from '../interceptor'
import Base from './base.js'

// 流程分析相关接口
class Approval extends Base {
  // 授权强度分析查询
  async findAuthorizationStrength(p) {
    const res = await post('analysis/findAuthorizationStrength', p)
    return res
  }
  // 表单查询
  async findApprovalEfficiency(p) {
    const res = await post('analysis/findApprovalEfficiency', p)
    return res
  }
  // 职位查询
  async findNodeEfficiency(p) {
    const res = await post('analysis/findNodeEfficiency', p)
    return res
  }
  // 组织查询
  async findResAnalysisOrg(p) {
    const res = await post('analysisOrg/findResAnalysisOrg', p)
    return res
  }
  // 组织查询2
  async findResAnalysisOrgPage(p) {
    const res = await post('analysisOrg/findResAnalysisOrgPage', p)
    return res
  }
  // 效率分析查询
  async findResAnalysisDetail(p) {
    const res = await post('analysisDetail/findResAnalysisDetail', p)
    return res
  }
}

const approval = new Approval()
export default approval
