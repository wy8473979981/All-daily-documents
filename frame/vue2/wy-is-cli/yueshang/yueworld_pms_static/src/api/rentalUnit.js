
// 基础数据（写字楼）

import { Api } from '@/utils/api'

export class RentalUnitApi extends Api {
  // 获取租赁单元维护
  bisOfficeRentalUnitList(param) {
    return this.post(`/mock/26/pms/bisOffice/rentalUnit/list`, param)
  }
}

export const rentalUnitApi = new RentalUnitApi()

