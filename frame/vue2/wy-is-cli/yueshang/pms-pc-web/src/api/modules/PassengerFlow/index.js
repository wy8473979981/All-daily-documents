import { Api } from 'utils/api'
export class PassengerFlow extends Api {
  // 客流排名-总部  获取列表数据
  getListByRankingOfHeadquarters = (params) => {
    return this.post('/plpms-report/bis/passengerFlow4PC/queryPassengerFlowRanking', params)
  }
  // 客流分析-项目 获取列表数据
  getListByAnalysisOfProject = (params) => {
    return this.post('/plpms-report/bis/passengerFlow4PC/queryPassengerFlowAnalysis', params)
  }
  // 日客流（项目）
  getListByDailyOfProject = (params) => {
    return this.post('/plpms-report/bis/passengerFlow4PC/queryDaliyPassengerFlow', params)
  }
}

export const passengerFlow = new PassengerFlow()