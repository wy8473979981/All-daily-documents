/*
 * @Author: zsj
 * @LastEditors: zsj
 * @Description: api接口示例
 * @Description: 招商工具
 */
import { Api } from '@/utils/api'

export class HoldinveStmentdueApi extends Api {
  // 获取租赁合同列表
  holdList = (param) => {
    return this.post(`/mock/26/pms/contract/list`, param)
  }
    // 列表页删除按钮
    approveDeleteList = (param) => {
      return this.post('/mock/26/pms/bisExamineApprove/delete', param)
    }
}

export const holdinveStmentdueApi = new HoldinveStmentdueApi()

