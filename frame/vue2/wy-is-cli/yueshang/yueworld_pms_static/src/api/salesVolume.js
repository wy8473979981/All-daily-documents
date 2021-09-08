import { Api } from '@/utils/api'

export class SalesVolumeApi extends Api {
    // 获取销售录入列表
    salesVolumeBookList = (param) => {
      return this.post(`/mock/26/pms/salesVolumeBook/list`, param)
    }
    // 按日获取销售录入列表
    salesVolumeBookByDayList = (param) => {
      return this.post(`/mock/26/pms/salesVolumeBookByDay/list`, param)
    }
    // 试算提成租金
    tryComputeNetSales = (param) => {
      return this.post(`/mock/26/pms/salesVolumeBookByDay/netSalesComputed`, param)
    }
    // 销售目标录入列表
    salesVolumeTargetList = (param) => {
      return this.post(`/mock/26/pms/salesVolumeTarget/list`, param)
    }
    // 净销售额审核
    netSalesVolumeCommit = (param) => {
      return this.post(`/mock/26/pms/netSalesVolumeTarget/check`, param)
    }
    // 复核销售额审核
    confirmSalesVolumeCommit = (param) => {
      return this.post(`/mock/26/pms/confirmSalesVolume/check`, param)
    }
    // 品类复核销售额审核
    categoryConfirmSalesVolumeCommit = (param) => {
      return this.post(`/mock/26/pms/categoryConfirmSalesVolume/check`, param)
    }
    // 复核
    confirmSalesVolumeReview = (param) => {
      return this.post(`/mock/26/pms/confirmSalesVolume/review`, param)
    }
    // 驳回
    confirmSalesVolumeBack = (param) => {
      return this.post(`/mock/26/pms/confirmSalesVolume/back`, param)
    }
    // 复核销售额调整
    confirmItemChange = (param) => {
      return this.post(`/mock/26/pms/confirmItemChange/commit`, param)
    }
    // 品类复核销售额调整
    confirmCategoryItemChange = (param) => {
      return this.post(`/mock/26/pms/confirmCategoryItemChange/commit`, param)
    }
    // 保存
    save = (param) => {
      return this.post(`/mock/26/pms/salesVolume/save`, param)
    }
}

export const salesVolumeApi = new SalesVolumeApi()
