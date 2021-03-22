import { post, get } from "./api";
import { URL } from "./URL"
class keliu {
    // 客流排名 - 查询项目客流、客流密度折线图
    async queryPassengerFlowLineChart(p, showLoading = true) {
        return await post(URL.keliuURL.queryPassengerFlowLineChart, p, showLoading)
    }
    // 客流排名 - 查询项目排名
    async queryPassengerFlowForPassengerFlowRanking(p, showLoading = true) {
        return await post(URL.keliuURL.queryPassengerFlowForPassengerFlowRanking, p, showLoading)
    }
    // 月客流 - 查询项目的月客流排名
    async queryMonthlyPassengerFlowRanking(p, showLoading = true) {
        return await post(URL.keliuURL.queryMonthlyPassengerFlowRanking, p, showLoading)
    }
    // 客流监控 - 查询最近7天客流折线图
    async queryTotalDailyPassengerFlowInRecentSevenDays(p, showLoading = true) {
        return await post(URL.keliuURL.queryTotalDailyPassengerFlowInRecentSevenDays, p, showLoading)
    }
    //客流监控 - 查询最近3年客流柱状图
    async queryPassengerFlowRecentThreeYears(p, showLoading = true) {
        return await post(URL.keliuURL.queryPassengerFlowRecentThreeYears, p, showLoading)
    }
    // 客流监控 - 查询项目客流考核指标
    async queryEvaluationIndex(p, showLoading = true) {
        return await post(URL.keliuURL.queryEvaluationIndex, p, showLoading)
    }
    // 客流时段对比 - 查询项目排名
    async queryRankingOfItemsInDateRange(p, showLoading = true) {
        return await post(URL.keliuURL.queryRankingOfItemsInDateRange, p, showLoading)
    }
    // 客流时段对比 - 查询项目客流折线图
    async queryTheNumberOfPassengersPerPeriodWithinTheDateRange(p, showLoading = true) {
        return await post(URL.keliuURL.queryTheNumberOfPassengersPerPeriodWithinTheDateRange, p, showLoading)
    }
}
const keliuServe = new keliu()
export default keliuServe