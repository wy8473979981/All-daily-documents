import { post, get } from "./api";
import { URL } from "./URL"
class makeBusiness {
	async geteEchartData(p, showLoading = true) {
		return await post(URL.makeBusinessURL.queryOpenRateList, p, showLoading)
	}
	async getTotalTable(p, showLoading = true) {
		return await post(URL.makeBusinessURL.queryOpenAndLeaseProjectList, p, showLoading)
	}
	async getDetailTable(p, showLoading = true) {
		return await post(URL.makeBusinessURL.queryOpenAndLeaseProjectDetailsList, p, showLoading)
	}
	async getEmptyDetail(p, showLoading = true) {
		return await post(URL.makeBusinessURL.queryEmptyStoreList, p, showLoading)
	}
}
const makeBusinessServe = new makeBusiness()
export default makeBusinessServe