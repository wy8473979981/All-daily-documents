/*
 * @Author: fhj
 * @LastEditors: fhj
 * @Description: 
 */
import { Api } from 'utils/api'

export const exportConfig = {
  'or-ranking-headquarters': '/plpms-report/bis/zs/exportOpenRateProjectList', // 开业率排名 总部
  'or-ranking-project': '/plpms-report/bis/zs/exportOpenRateProjectDetailsList', // 开业率排名 项目
  'or-summary-headquarters': '/plpms-report/bis/zs/exportOpenRateProjectSumList', // 开业率汇总排名 总部
  'or-summary-project': '/plpms-report/bis/zs/exportOpenRateProjectDetailsSumList', // 开业率汇总排名 项目
  'or-check-project': '/plpms-report/bis/zs/exportOpenRateContDetailsList', // 考核开业面积明细 项目
  'or-floor-project': '/plpms-report/bis/zs/exportOpenRateFloorList', // 开业率楼层明细 项目
  'or-area-project': '/plpms-report/bis/zs/exportQcOpenRateContDetailsList', // 开业率面积明细 项目
  'or-rent-project': '/plpms-report/bis/zs/exportCoverRentDetailsList', // 押不低租面积明细 项目

  'lr-lease-headquarters': '/plpms-report/bis/zs/exportQueryLeaseRateProjectList', // 出租率排名 总部
  'lr-report-project': '/plpms-report/bis/zs/exportQueryLeaseRateProjectList', // 出租率排名 项目汇总
  'lr-check-project': '/plpms-report/bis/occupancyRate4PC/queryProjectCheckRentalDetailsExport', // 项目考核出租面积明细
  'lr-area-project': '/plpms-report/bis/zs/exportStoreSquareDetailsList', // 项目总面积明细
  'lr-realsearea-project': '/plpms-report/bis/occupancyRate4PC/queryQcProjectRentalDetailsExport', // 项目出租面积明细
  'lr-rent-project': '/plpms-report/bis/occupancyRate4PC/queryProjectCoverRentDetailsExport', // 项目押不低租面积明细


  'sv-ranking-headquarters': '/plpms-report/bis/sale-project/querySalesRankingExport', // 销售排名 总部
  'sv-analysis-project': '/plpms-report/bis/sale-project/queryProjectSalesAnalysisExport', // 销售分析 项目


  'pf-ranking-headquarters': '/plpms-report/bis/passengerFlow4PC/queryPassengerFlowRankingExport', // 客流排名 总部
  'pf-analysis-project': '/plpms-report/bis/passengerFlow4PC/queryPassengerFlowAnalysisExport', // 客流分析 总部


  'income-rent-headquarters': '/plpms-report/bis/rent-fee/queryRentAllProjectListExport', // 租金收缴率 总部
  'income-rent-project': '/plpms-report/bis/rent-fee/queryRentProjectListExport', // 租金收缴率 项目
  'income-properymanagement-headquarters': '/plpms-report/bis/rent-fee/queryFeeAllProjectListExport', // 物管收缴率 总部
  'income-properymanagement-project': '/plpms-report/bis/rent-fee/queryFeeProjectListExport', // 物管收缴率 项目
  'income-arrears-project': '/plpms-report/bis/oweFee4PC/queryProjectOweFeeDetailExport', // 欠费查询

  'ar-average-headquarters': '/plpms-report/bis/avgRentFee/queryAllAveRentFeeExport', // 平均租金 总部
  'ar-average-project': '/plpms-report/bis/avgRentFee/queryProjectAveRentFeeExport', // 平均租金 项目

  'brf-list':'/plpms-report/bis/zs/report/investmentReportExport', // 招商报表导出
}
export class ExportExcel extends Api {
  exportApi = (url, params) => {
    return this.post(url, params, { responseType: 'arraybuffer' })
  }
}

export const exportEexcel = new ExportExcel()

