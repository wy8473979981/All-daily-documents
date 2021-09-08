/*
 * @Author: zsj
 * @LastEditors: zengcheng
 * @Description: api接口示例
 * @Description: 意向协议
 */
import { Api } from '@/utils/api'

export class AgreementIntentionApi extends Api {
  // 获取基础数据列表楼栋维护
  agreementList = (param) => {
    return this.post(`/mock/26/pms/agreementIntention/list`, param)
  }
  // 配置字段
  configurAtion = (param) => {
    return this.post(`/mock/26/pms/configuration/add`, param)
  }
  // 列表页删除按钮
  approveDeleteList = (param) => {
    return this.post('/mock/26/pms/bisExamineApprove/delete', param)
  }
}

export const agreementIntentionApi = new AgreementIntentionApi()

