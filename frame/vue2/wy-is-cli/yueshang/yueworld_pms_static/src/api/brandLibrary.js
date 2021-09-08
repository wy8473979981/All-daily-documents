import { Api } from '@/utils/api'

export class BrandLibraryApi extends Api {
    // 获取品牌库数据列表
    brandLibraryList = (param) => {
      return this.post(`/mock/26/pms/brandLibrary/list`, param)
    }
    // 获取品牌库保存
    brandLibrarySave = (param) => {
      return this.post(`/mock/26/pms/brandLibrary/save`, param)
    }
    // 获取品牌变更数据列表
    brandLibraryChangeList = (param) => {
      return this.post(`/mock/26/pms/brandLibraryChange/list`, param)
    }
    // 品牌变更数据列表删除
    brandLibraryChangeDelete = (param) => {
      return this.post(`/mock/26/pms/brandLibraryChangeDelete`, param)
    }
    // 品牌变更数据详情
    brandLibraryChangeDetail = (param) => {
      return this.post(`/mock/26/pms/brandLibraryChange/detail`, param)
    }
}

export const brandLibraryApi = new BrandLibraryApi()
