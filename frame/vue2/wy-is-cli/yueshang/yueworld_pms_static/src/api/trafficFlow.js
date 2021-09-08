import { Api } from '@/utils/api'

export class TrafficFlowApi extends Api {
    // 获取车流填报列表
    trafficFlowDataList = (param) => {
      return this.post(`/mock/26/pms/trafficFlowData/list`, param)
    }
    // 获取车流目标列表
    trafficFlowTargetList = (param) => {
      return this.post(`/mock/26/pms/trafficFlowTarget/list`, param)
    }
}

export const trafficFlowApi = new TrafficFlowApi()
