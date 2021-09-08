/*
 * @Description: 意向协议以及租赁合同详情接口
 * @Author: zengcheng
 * @Date: 2021-07-18 16:42:43
 * @LastEditors: zengcheng
 * @LastEditTime: 2021-07-18 16:46:57
 */

import { Api } from '@/utils/api'

export class AgreementOfIntentDetailsApi extends Api {
  // 详情
  agreementOfIntentDetails = (param) => {
    return this.post(`/mock/26/pms/AgreementOfIntent/details`, param)
  }
  // 详情
  agreementOfIntentContractDiffData = (param) => {
    return this.post(`/mock/26/pms/AgreementOfIntent/contractDiffData`, param)
  }
}

export const agreementOfIntentDetailsApi = new AgreementOfIntentDetailsApi()
