import { Api } from '@/utils/api'

export class PassengerFlowApi extends Api {
    // 获取客流填报列表
    passengerFlowBookList = (param) => {
      return this.post(`/mock/26/pms/passengerFlowBook/list`, param)
    }
    // 获取客流目标列表
    passengerFlowTargetList = (param) => {
      return this.post(`/mock/26/pms/passengerFlowTarget/list`, param)
    }
}

export const passengerFlowApi = new PassengerFlowApi()
