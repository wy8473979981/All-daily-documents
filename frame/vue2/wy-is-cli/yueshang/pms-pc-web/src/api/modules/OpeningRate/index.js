import { Api } from 'utils/api'
export class OpeningRateApi extends Api {
  // 开业率排名 总部
  getListByRankingOfHeadquarters = (params) => {
    return this.post('/plpms-report/bis/zs/queryOpenRateProjectList', params)
  }

  // 开业率汇总排名 总部
  getListBySummaryOfHeadquarters = (params) => {
    return this.post('/plpms-report/bis/zs/queryOpenRateProjectSumList', params)
  }

  //  开业率排名 项目
  getListByRankingOfProject = (params) => {
    return this.post('/plpms-report/bis/zs/queryOpenRateProjectDetailsList', params)
  }

  // 开业率汇总排名 项目
  getListBySummaryOfProject = (params) => {
    return this.post('/plpms-report/bis/zs/queryOpenRateProjectDetailsSumList', params)
  }

  // 考核开业面积明细 项目
  getListByCheckOfProject = (params) => {
    return this.post('/plpms-report/bis/zs/queryOpenRateContDetailsList', params)
  }

  // 开业率楼层明细 项目
  getListByFloorOfProject = (params) => {
    return this.post('/plpms-report/bis/zs/queryOpenRateFloorList', params)
  }

  // 开业率面积明细 项目
  getListByAreaOfProject = (params) => {
    return this.post('/plpms-report/bis/zs/queryQcOpenRateContDetailsList', params)
  }

  // 押不低租面积明细 项目
  getListByRentOfProject = (params) => {
    return this.post('/plpms-report/bis/zs/queryCoverRentDetailsList', params)
  }

  // 查询两年开业率列表  图表 两个通用，项目的给个项目id
  getListByQueryOpenRateList = (params) => {
    return this.post('/plpms-report/bis/zs/queryOpenRateList', params)
  }

}

export const openingRate = new OpeningRateApi()