import { Api } from 'utils/api'
export class ExportExcel extends Api {
  // 开业率排名 总部 
  exportOfOrRankingHeadquarters = (params) => {
    return this.post('/plpms-report/bis/zs/exportOpenRateProjectList', params, { responseType: 'arraybuffer' })
  }
  // 开业率排名 项目 
  exportOfOrRankingProject = (params) => {
    return this.post('/plpms-report/bis/zs/exportOpenRateProjectDetailsList', params, { responseType: 'arraybuffer' })
  }
  // 开业率汇总排名 总部
  exportOfOrSummaryHeadquarters = (params) => {
    return this.post('/plpms-report/bis/zs/exportOpenRateProjectSumList', params, { responseType: 'arraybuffer' })
  }
  // 开业率汇总排名 项目
  exportOfOrSummaryProject = (params) => {
    return this.post('/plpms-report/bis/zs/exportOpenRateProjectDetailsSumList', params, { responseType: 'arraybuffer' })
  }
  // 考核开业面积明细 项目 
  exportOfOrCheckProject = (params) => {
    return this.post('/plpms-report/bis/zs/exportOpenRateContDetailsList', params, { responseType: 'arraybuffer' })
  }


  // 出租率排名 总部 项目汇总
  exportOfLrLeaseHeadquarters = (params) => {
    return this.post('/plpms-report/bis/zs/exportQueryLeaseRateProjectList', params, { responseType: 'arraybuffer' })
  }
  // 出租率排名 项目汇总
  // exportOfLrReportProject = (params) => {
  //   return this.post('/plpms-report/bis/zs/exportQueryLeaseRateProjectList', params, { responseType: 'arraybuffer' })
  // }
  // 项目考核出租面积明细
  exportOfLrCheckProject = (params) => {
    return this.post('/plpms-report/bis/occupancyRate4PC/queryProjectCheckRentalDetailsExport', params, { responseType: 'arraybuffer' })
  }


  // 销售排名 总部 
  exportOfSvRankingHeadquarters = (params) => {
    return this.post('/plpms-report/bis/sale-project/querySalesRankingExport', params, { responseType: 'arraybuffer' })
  }
  // 销售分析 项目 
  exportOfSvAnalysisProject = (params) => {
    return this.post('/plpms-report/bis/sale-project/queryProjectSalesAnalysis', params, { responseType: 'arraybuffer' })
  }


  // 客流排名 总部 
  exportOfPfRankingHeadquarters = (params) => {
    return this.post('/plpms-report/bis/passengerFlow4PC/queryPassengerFlowRankingExport', params, { responseType: 'arraybuffer' })
  }
  // 客流分析 项目 
  exportOfPfAnalysisProject = (params) => {
    return this.post('/plpms-report/bis/passengerFlow4PC/queryPassengerFlowAnalysisExport', params, { responseType: 'arraybuffer' })
  }


  // 租金收缴率 总部 
  exportOfIncomeRentHeadquarters = (params) => {
    return this.post('/plpms-report/bis/rent-fee/queryRentAllProjectListExport', params, { responseType: 'arraybuffer' })
  }
  // 租金收缴率 项目 
  exportOfIncomeRentProject = (params) => {
    return this.post('/plpms-report/bis/rent-fee/queryRentProjectListExport', params, { responseType: 'arraybuffer' })
  }
  // 物管收缴率 总部 
  exportOfIncomeProperymanagementHeadquarters = (params) => {
    return this.post('/plpms-report/bis/rent-fee/queryFeeAllProjectListExport', params, { responseType: 'arraybuffer' })
  }
  // 物管收缴率 项目 
  exportOfIncomeProperymanagementtProject = (params) => {
    return this.post('/plpms-report/bis/rent-fee/queryFeeProjectListExport', params, { responseType: 'arraybuffer' })
  }
  // 欠费查询 
  exportOfIncomeArrearsProject = (params) => {
    return this.post('/plpms-report/bis/oweFee4PC/queryProjectOweFeeDetailExport', params, { responseType: 'arraybuffer' })
  }


  // 平均租金 总部 
  exportOfArAverageHeadquarters = (params) => {
    return this.post('/plpms-report/bis/avgRentFee/queryAllAveRentFeeExport', params, { responseType: 'arraybuffer' })
  }
  // 平均租金 项目 
  exportOfArAverageProject = (params) => {
    return this.post('/plpms-report/bis/avgRentFee/queryProjectAveRentFeeExport', params, { responseType: 'arraybuffer' })
  }
}

export const exportEexcel = new ExportExcel()

