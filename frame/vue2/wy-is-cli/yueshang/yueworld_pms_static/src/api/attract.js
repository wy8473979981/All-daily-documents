/*
 * @Author: zsj
 * @LastEditors: zsj
 * @Description: api接口示例
 * @Description: 招商工具
 */
import { Api } from '@/utils/api'

export class AttractlistApi extends Api {
  // 获取基础数据列表楼栋维护
  attractList = (param) => {
    return this.post(`/mock/26/pms/attractList/list`, param)
  }
    // 列表页删除按钮
    approveDeleteList = (param) => {
      return this.post('/mock/26/pms/bisExamineApprove/delete', param)
    }
}

export const attractlistApi = new AttractlistApi()

