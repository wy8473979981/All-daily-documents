/*
 * @Author: fhj
 * @LastEditors: zengcheng
 * @Description: api接口示例
 * @Description: 基础数据
 */
import { Api } from '@/utils/api'
export class BasicApi extends Api {
  // 获取基础数据（区域维护列表）
  areaMaintenanceList(param) {
    return this.post(`/mock/26/pms/bisOffice/areaMaintenance/list`, param)
  }

  // 获取基础数据（区域维护编辑）
  areaMaintenanceEdit(param) {
    return this.post(`/mock/26/pms/bisOffice/areaMaintenance/edit`, param)
  }

  // 获取基础数据（城市维护列表）
  urbanMaintenanceList(param) {
    return this.post(`/mock/26/pms/bisOffice/urbanMaintenance/list`, param)
  }
  // 获取基础数据（城市维护编辑）
  urbanMaintenanceEdit(param) {
    return this.post(`/mock/26/pms/bisOffice/urbanMaintenance/edit`, param)
  }

  // 获取基础数据（商铺维护列表）
  shopMaintenanceList(param) {
    return this.post(`/mock/26/pms/bisOffice/shopMaintenance/list`, param)
  }

  // 获取基础数据（商铺维护编辑）
  shopMaintenanceEdit(param) {
    return this.post(`/mock/26/pms/bisOffice/shopMaintenance/edit`, param)
  }
}

export const basicApi = new BasicApi()
