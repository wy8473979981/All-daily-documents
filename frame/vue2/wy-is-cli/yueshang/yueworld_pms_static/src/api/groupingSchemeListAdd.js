/*
 * @Author: zsj
 * @LastEditors: zsj
 * @Description: api接口示例
 * @Description: 计租方案新增
 */
import { Api } from '@/utils/api'

export class GroupingSchemeListAdd extends Api {
  // 获取租赁合同列表
  groupingSchemeList = (param) => {
    return this.post(`/mock/26/pms/groupingSchemeList/add`, param)
  }
  brandPositioningDetail = (param) => {
    return this.post(`/mock/26/pms/groupingSchemeListAdd/detail`, param)
  }
    // 列表页删除按钮
    approveDeleteList = (param) => {
      return this.post('/mock/26/pms/bisExamineApprove/delete', param)
    }
}

export const groupingSchemeListAdd = new GroupingSchemeListAdd()

