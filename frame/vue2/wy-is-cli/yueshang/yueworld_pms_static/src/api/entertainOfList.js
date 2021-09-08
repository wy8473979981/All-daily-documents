/*
 * @Author: zsj
 * @LastEditors: xueyx
 * @Description: api接口示例
 * @Description: 招商进度
 */
import { Api } from '@/utils/api'

export class EntertainOfListApi extends Api {
  // 获取基础数据列表楼栋维护
  entertainOfList = (param) => {
    return this.post(`/mock/26/pms/entertainOfList/list`, param)
  }
  // 列表页删除按钮
  approveDeleteList = (param) => {
    return this.post('/mock/26/pms/bisExamineApprove/delete', param)
  }
  // 招商进度详情页数据
  entertainOfDetail = (param) => {
    return this.post('/mock/26/pms/entertainOfList/detail', param)
  }
}

export const entertainOfListApi = new EntertainOfListApi()

