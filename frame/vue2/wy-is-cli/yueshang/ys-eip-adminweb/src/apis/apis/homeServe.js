import { post, get } from "../interceptor";
import { URL } from "../URL"
class home {
	async getTopCount(p, showLoading = false) {
		return await get(URL.home.topCountUrl, p, showLoading)
	}
	async requestTotal(p, showLoading = false) {
		return await get(URL.home.requestTotalUrl, p, showLoading)
	}
	async appRequestTotal(p, showLoading = false) {
		return await get(URL.home.appRequestTotalUrl, p, showLoading)
	}
	async successTotal(p, showLoading = false) {
		return await get(URL.home.successTotalUrl, p, showLoading)
	}
}
const homeServe = new home()
export default homeServe