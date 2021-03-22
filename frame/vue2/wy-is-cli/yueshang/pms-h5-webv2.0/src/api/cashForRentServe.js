import { post, get } from "./api";
import { URL } from "./URL"
class cashForRent {
	async getTotalData(p, showLoading = true) {
		return await post(URL.cashForRentURL.queryTotal, p, showLoading)
	}
	async getTotalDetailData(p, showLoading = true) {
		return await post(URL.cashForRentURL.queryList, p, showLoading)
	}
}
const cashForRentServe = new cashForRent()
export default cashForRentServe