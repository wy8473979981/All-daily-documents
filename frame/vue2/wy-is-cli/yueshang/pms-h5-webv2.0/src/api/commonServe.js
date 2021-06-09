import { post, get } from "./api";
import { URL } from "./URL"
import { BlApi } from "./apiOther"

class common {
    // 企业微信环境获取 用户信息
    async getToken (p, showLoading = false) {
        return await get(BlApi.getToken, p, showLoading)
    }

    // 物业类型
    async getGroups (p, showLoading = false) {
        return await post(URL.commonURL.chargeTypeDict, p, showLoading)
    }
    // 查询全部字典
    async getAllDict (p, showLoading = false) {
        return await post(URL.commonURL.allDict, p, showLoading)
    }
}
const commonServe = new common()
export default commonServe
