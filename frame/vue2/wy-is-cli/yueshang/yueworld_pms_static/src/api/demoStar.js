/*
 * @Author: xza
 * @LastEditors: xza
 * @Description: api接口示例
 * @Description: 辅助核算
 */
import { Api } from '@/utils/api'
export class DemoStarApi extends Api {
    // 列表
    demoStarList = (param) => {
      return this.post(`/mock/26/pms/demoStar/list`, param)
    }
    // 新增数据
    demoStarCreate = (param) => {
      return this.post('/mock/26/pms/demoStar/create', param)
    }
    // 编辑时 删除该条数据
    demoStarDelete = (param) => {
      return this.post('/mock/26/pms/demoStar/delete', param)
    }
}
export const demoStarApi = new DemoStarApi()