import { post, get } from "./api";
import { URL } from "./URL"
class yusuan {
    async getZfgkSheet(p, showLoading = true) {
        return await post(URL.yusuanURL.getZfgkSheet, p, showLoading)
    }

    async getZyzbSheet(p, showLoading = true) {
        return await post(URL.yusuanURL.getZyzbSheet, p, showLoading)
    }
    async getZjjhSheet(p, showLoading = true) {
        return await post(URL.yusuanURL.getZjjhSheet, p, showLoading)
    }
    async getMjxxSheet(p, showLoading = true) {
        return await post(URL.yusuanURL.getMjxxSheet, p, showLoading)
    }
    async getRsfySheet(p, showLoading = true) {
        return await post(URL.yusuanURL.getRsfySheet, p, showLoading)
    }
    async getRyxxSheet(p, showLoading = true) {
        return await post(URL.yusuanURL.getRyxxSheet, p, showLoading)
    }
    async getXzfySheet(p, showLoading = true) {
        return await post(URL.yusuanURL.getXzfySheet, p, showLoading)
    }
    async getBudgetInstanceSheet(p, showLoading = true) {
        return await post(URL.yusuanURL.getBudgetInstanceSheet, p, showLoading)
    }
    async getQhfSheet(p, showLoading = true) {
        return await post(URL.yusuanURL.getQhfSheet, p, showLoading)
    }
	async getEnergySheet(p, showLoading = true) {
		return await post(URL.yusuanURL.getEnergySheet, p, showLoading)
	}
	async getCollectEmpSheet(p, showLoading = true) {
		return await post(URL.yusuanURL.getCollectEmpSheet, p, showLoading)
	}
	async getProjectSheet(p, showLoading = true) {
		return await post(URL.yusuanURL.getProjectSheet, p, showLoading)
	}
	async getJfSheet(p, showLoading = true) {
		return await post(URL.yusuanURL.getJfSheet, p, showLoading)
	}
	async getDcSheet(p, showLoading = true) {
		return await post(URL.yusuanURL.getDcSheet, p, showLoading)
	}
}
const yusuanServe = new yusuan()
export default yusuanServe