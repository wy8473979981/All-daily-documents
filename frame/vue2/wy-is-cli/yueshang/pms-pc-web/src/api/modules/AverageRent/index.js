import { Api } from 'utils/api'
export class AverageRentApi extends Api {
  // 平均租金（总部） 
  getListByAverageOfHeadquarters = (params) => {
    return this.post('/plpms-report/bis/avgRentFee/queryAllAveRentFee', params)
  }
  // 平均租金（项目） 项目
  getListByAverageOfProject = (params) => {
    return this.post('/plpms-report/bis/avgRentFee/queryProjectAveRentFee', params)
  }
}

export const averageRent = new AverageRentApi()