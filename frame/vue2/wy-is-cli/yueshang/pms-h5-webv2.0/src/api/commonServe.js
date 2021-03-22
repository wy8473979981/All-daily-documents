import { post, get } from "./api";
import { URL } from "./URL"
class common {
    // 物业类型
    async getGroups(p, showLoading = false) {
        return await post(URL.commonURL.chargeTypeDict, p, showLoading)
    }
    // 查询全部字典
    async getAllDict(p, showLoading = false) {
        return await post(URL.commonURL.allDict, p, showLoading)
    }
}
const commonServe = new common()
export default commonServe