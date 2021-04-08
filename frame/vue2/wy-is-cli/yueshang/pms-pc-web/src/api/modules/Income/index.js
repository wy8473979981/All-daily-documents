import { Api } from 'utils/api'
export class IncomeApi extends Api {
  // 收缴率 总部
  getListByRentOfHeadquarters = (params) => {
    return this.post('/plpms-report/bis/rent-fee/queryRentFeeProjectList', params)
  }

  // 收缴率 总部
  getListByRentOfProject = (params) => {
    return this.post('/plpms-report/bis/rent-fee/queryRentFeeProjectDetailsList', params)
  }
  // 收缴率折线图
  getChart = (params) => {
    return this.post('/plpms-report/bis/rent-fee/queryCollectionRateList', params)
  }

  // 收入 欠费查询 项目
  getListByArrearsOfProject = (params) => {
    return this.post('/plpms-report/bis/oweFee4PC/queryProjectOweFeeDetail', params)
  }
}

export const income = new IncomeApi()