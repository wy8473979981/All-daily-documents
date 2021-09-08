/*
 * @Author: zyq
 * @LastEditors: zengcheng
 * @Description: api接口示例
 * @Description: 基础数据
 */
import { Api } from '@/utils/api'
export class MeterApi extends Api {
  // 获取基础数据（计组方案列表）
  groupList(param) {
    return this.post(`/mock/26/pms/groupMeter/list`, param)
  }
}

export const meterApi = new MeterApi()
