import { Api } from 'utils/api'
export class LeaseRateApi extends Api {
  // 查询出租率排名（总部） 出租率报表汇总（项目）
  getListByLeaseOfHeadquarters = (params) => {
    return this.post('/plpms-report/bis/zs/queryLeaseRateProjectList', params)
  }
  // 项目考核出租面积明细 获取列表
  getListByCheckOfProject = (params) => {
    return this.post('/plpms-report/bis/occupancyRate4PC/queryProjectCheckRentalDetails', params)
  }

  // 项目总面积明细 获取列表
  getListByAreaOfProject = (params) => {
    return this.post('/plpms-report/bis/zs/queryStoreSquareDetailsList', params)
  }
  // 项目出租面积明细 获取列表
  getListByRealseareaOfProject = (params) => {
    return this.post('/plpms-report/bis/occupancyRate4PC/queryQcProjectRentalDetails', params)
  }
  // 项目押不低租面积明细 获取列表
  getListByRentOfProject = (params) => {
    return this.post('/plpms-report/bis/occupancyRate4PC/queryProjectCoverRentDetails', params)
  }


  // 查询两年出租率列表  图表 两个通用，项目的给个项目id
  getListByQueryLeaseRateList = (params) => {
    return this.post('/plpms-report/bis/zs/queryOpenRateList', params)
  }
}

export const leaseRate = new LeaseRateApi()