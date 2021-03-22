import { post, get } from "./api";
import { URL } from "./URL"
class cheliu {
	async echartData(p, showLoading = true) {
		return await post(URL.cheliuURL.queryMonthlyCarFlowWhenCurYearAndlastYearByDate, p, showLoading)
	}
	async tableData(p, showLoading = true) {
		return await post(URL.cheliuURL.queryProjectRankingForCarFlow, p, showLoading)
	}
}
const cheliuServe = new cheliu()
export default cheliuServe