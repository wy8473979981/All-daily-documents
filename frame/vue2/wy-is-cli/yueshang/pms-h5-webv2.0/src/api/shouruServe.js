import { post, get } from "./api";
import { URL } from "./URL"
class shouru {
    // 查询两年收缴率列表 - echart 数据  - 查询具体项目数据 传递 projectId
    async queryCollectionRateList(p, showLoading = true) {
        return await post(URL.shouruURL.queryCollectionRateList, p, showLoading)
    }
    // 根据年月、物业类型、费项,查询租金,物管,多经 列表
    async queryRentFeeProjectList(p, showLoading = true) {
        return await post(URL.shouruURL.queryRentFeeProjectList, p, showLoading)
    }
    // 根据年份、物业类型、费项、项目id，查询租金,物管,多经 列表（项目详情） - 具体项目的table数据
    async queryRentFeeProjectDetailsList(p, showLoading = true) {
        return await post(URL.shouruURL.queryRentFeeProjectDetailsList, p, showLoading)
    }
}
const shouruServe = new shouru()
export default shouruServe