import { Api } from 'utils/api'
export class SalesVolume extends Api {
  // 销售排名 总部 获取列表数据
  getListByRankingOfHeadquarters = (params) => {
    return this.post('/plpms-report/bis/sale-project/querySalesRanking', params)
  }
  // 销售分析 项目 获取列表数据
  getListByAnalysisOfProject = (params) => {
    return this.post('/plpms-report/bis/sale-project/queryProjectSalesAnalysis', params)
  }
}

export const salesVolume = new SalesVolume()