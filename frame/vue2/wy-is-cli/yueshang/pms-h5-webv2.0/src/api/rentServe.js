import { post, get } from "./api";
import { URL } from "./URL"
class rent {
    async getTotalData(p, showLoading = true) {
        return await post(URL.rentURL.queryTotal, p, showLoading)
    }
    async getTotalDetailData(p, showLoading = true) {
        return await post(URL.rentURL.queryList, p, showLoading)
    }
}
const rentServe = new rent()

export default rentServe