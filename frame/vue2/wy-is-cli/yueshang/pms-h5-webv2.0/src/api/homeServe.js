import { post, get } from "./api";
import { URL } from "./URL"
class home {
    // 根据年月、物业类型、费项(1租金,2物管,3多经,默认1),查询 租金收入、物管收入、 多经收入 汇总数据
    async queryRentFeeTotal (p, showLoading = true) {
        return await post(URL.homeURL.queryRentFeeTotal, p, showLoading)
    }
    // 查询客流模块汇总数据
    async queryPassengerFlowData (p, showLoading = true) {
        return await post(URL.homeURL.queryPassengerFlowData, p, showLoading)
    }
    // 查询销售模块汇总数据
    async querySaleFlowData (p, showLoading = true) {
        return await post(URL.homeURL.querySaleFlowData, p, showLoading)
    }
    // 查询车流模块汇总数据
    async queryCarFlowData (p, showLoading = true) {
        return await post(URL.homeURL.queryCarFlowData, p, showLoading)
    }
    // 招商 首页 汇总数据
    async queryZsTotal (p, showLoading = true) {
        return await post(URL.homeURL.queryZsTotal, p, showLoading)
    }
    // 查询欠费模块汇总数据
    async queryOweFeeData (p, showLoading = true) {
        return await post(URL.homeURL.queryOweFeeData, p, showLoading)
    }
    // 获取会员汇总信息
    async getYunYingGeneralMemberInfo (p, showLoading = false) {
        return await post(URL.homeURL.getYunYingGeneralMemberInfo, p, showLoading)
    }
    // 获取会员列表信息
    async getMemberList (p, showLoading = false) {
        return await post(URL.homeURL.getMemberList, p, showLoading)
    }
    // 租约到期 根据物业类型查询,租约到期汇总数据
    async queryLeaseExpires (p, showLoading = true) {
        return await post(URL.homeURL.queryLeaseExpiresTotal, p, showLoading)
    }
    // 押不抵租 根据物业类型查询,押不抵租汇总数据
    async queryCoverRent (p, showLoading = true) {
        return await post(URL.homeURL.queryCoverRentTotal, p, showLoading)
    }
}
const homeServe = new home()
export default homeServe