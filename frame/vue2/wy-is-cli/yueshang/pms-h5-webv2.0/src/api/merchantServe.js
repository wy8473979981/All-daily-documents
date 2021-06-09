import { get, post } from "./api";
import { URL } from "./URL"
class merchant {
    // 获取 商家管理 列表
    async getMerchantList(p, showLoading = false) {
        return await get(URL.merchant.merchansList, p, showLoading)
    }
    // 获取 商家管理-业态 列表
    async getFormatList(p, showLoading = false) {
        return await get(URL.merchant.merchansFormatList, p, showLoading)
    }
    // 获取 商家管理-商家信息
    async getMerchantDetail(p, showLoading = false) {
        return await get(URL.merchant.bismerchanformatsbigsList, p, showLoading)
    }
    // 获取 商家管理-商家比较列表
    async getMerchantCompareDetail(p, showLoading = false) {
        return await get(URL.merchant.bismerchantsummarybigsList, p, showLoading)
    }
    // 获取 商家管理-商家比较echart
    async getListLineChart(p, showLoading = false) {
        return await get(URL.merchant.bismerchantsummarybigsListLineChart, p, showLoading)
    }
}
const merchantServe = new merchant()
export default merchantServe