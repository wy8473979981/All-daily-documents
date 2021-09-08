/*
 * @Author: fhj
 * @LastEditors: fhj
 * @Description:  招商报表
 */
import { Api } from 'utils/api'
export class BusinessReportForm extends Api {
  // 招商报表
  getBusinessReportFormList = (params) => {
    return this.post('/plpms-report/bis/zs/report/investmentReport', params)
  }
}

export const businessReportForm = new BusinessReportForm()