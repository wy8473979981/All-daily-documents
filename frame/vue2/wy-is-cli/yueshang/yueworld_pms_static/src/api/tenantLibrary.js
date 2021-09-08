import { Api } from '@/utils/api'

export class TenantLibraryApi extends Api {
    // 获取商家库数据列表
    tenantLibraryList = (param) => {
      return this.post(`/mock/26/pms/tenantLibrary/list`, param)
    }
    // 获取商家变更数据列表
    tenantLibraryChangeList = (param) => {
      return this.post(`/mock/26/pms/tenantLibraryChange/list`, param)
    }
    // 商品变更数据列表删除
    tenantLibraryChangeDelete = (param) => {
      return this.post(`/mock/26/pms/tenantLibraryChangeDelete`, param)
    }
    // 商品变更数据详情
    tenantLibraryChangeDetail = (param) => {
      return this.post(`/mock/26/pms/tenantLibraryChange/detail`, param)
    }
}

export const tenantLibraryApi = new TenantLibraryApi()
