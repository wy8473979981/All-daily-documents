import { post, get } from "./api";
import { URL } from "./URL"
class qianfei {
    // 欠费 - 欠费折线图
    async queryOweFeeLineChart(p, showLoading = true) {
        // 根据项目ID、费项、年份、物业类型，查询欠费折线图。如果项目ID为空，则查询当年的整体欠费折线图；如果项目ID不为空,则查询该项目当年的欠费折线图
        return await post(URL.qianfeiURL.queryOweFeeLineChart, p, showLoading)
    }
    // 欠费 - 欠费排名
    async queryOweFeeRanking(p, showLoading = true) {
        // 根据项目ID、费项、年月、物业类型，查询该项目当前的欠费排名。如果入参中的项目ID为空，则调用方获取的是欠费模块的欠费排名；如果入参中的项目ID不为空，则调用方获取的是欠费-项目模块的欠费排名
        return await post(URL.qianfeiURL.queryOweFeeRanking, p, showLoading)
    }
    // 欠费 - 当前欠费账龄
    async queryOweFeeAging(p, showLoading = true) {
        // 根据项目ID、费项，查询该项目当前的欠费账龄
        return await post(URL.qianfeiURL.queryOweFeeAging, p, showLoading)
    }
}
const qianfeiServe = new qianfei()
export default qianfeiServe