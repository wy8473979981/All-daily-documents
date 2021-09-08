/*
 * @Author: fhj
 * @LastEditors: fhj
 * @Description: api接口示例
 */
import { Api } from '@/utils/api'

export class HomeApi extends Api {
  // 获取首页信息
  homeData = () => {
    return this.post(`/mock/26/pms/target/getList`)
  }
}

export const homeApi = new HomeApi()
