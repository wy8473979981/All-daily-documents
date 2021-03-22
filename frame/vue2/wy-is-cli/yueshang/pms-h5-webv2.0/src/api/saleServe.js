import { post, get } from "./api";
import { URL } from "./URL"
class sale {
	async getSaleData(p, showLoading = true) {
		return await post(URL.saleURL.querySaleEchart, p, showLoading)
	}
	async getSaleTableData(p, showLoading = true) {
		return await post(URL.saleURL.queryProjectRankingByYS, p, showLoading)
	}
	async pxEchartData(p, showLoading = true) {
		return await post(URL.saleURL.queryBenefitsPerSquareMeterByYS, p, showLoading)
	}
	async layouEchartData(p, showLoading = true) {
		return await post(URL.saleURL.queryEchartByYPS, p, showLoading)
	}
	async businessSortData(p, showLoading = true) {
		return await post(URL.saleURL.queryBusinessSalesRanking, p, showLoading)
	}
}
const saleServe = new sale()
export default saleServe