import { Api } from 'utils/api'
export class DutyShopApi extends Api {
  // 责任铺分工 查询
  queryDivisionHisList = (params) => {
    return this.post("/plpms-report/bis/division/queryDivisionHisList", params);
  }
  // 责任铺分工 区域切换，项目同步切换
  searchProject = (params) => {
    return this.get("/plpms-report/bis/division/searchProject", params);
  }
}

export const dutyShop = new DutyShopApi();