import { get, post } from "./api";
import { URL } from "./URL"
class externalLink {
    // 获取所有的项目列表
    async getProjectList(p, showLoading = false) {
        return await get(URL.externalLinkURL.pdWx, p, showLoading)
    }
    // 获取会员汇总信息
    async getYunYingGeneralMemberInfo(p, showLoading = false) {
        return await get(URL.externalLinkURL.getYunYingGeneralMemberInfo, p, showLoading)
    }
    // 会员--整体概况
    async basicMemberData(p, showLoading = false) {
        return await get(URL.externalLinkURL.basicMemberData, p, showLoading)
    }
    // 注册渠道占比、会员性别占比、会员等级占比
    async memberRatio(p, showLoading = false) {
        return await get(URL.externalLinkURL.memberRatio, p, showLoading)
    }
    // 获取会员pie
    async memberFeature(p, showLoading = false) {
        return await get(URL.externalLinkURL.memberFeature, p, showLoading)
    }
    // 获取会员年龄分布
    async memberAge(p, showLoading = false) {
        return await get(URL.externalLinkURL.memberAge, p, showLoading)
    }
    // 积分产出占比
    async pointsRatio(p, showLoading = false) {
        return await get(URL.externalLinkURL.pointsRatio, p, showLoading)
    }
    // 消费业态分布
    async consumeCategoryDistribution(p, showLoading = false) {
        return await get(URL.externalLinkURL.consumeCategoryDistribution, p, showLoading)
    }
    //项目总弹窗信息
    async projectInfo(p, showLoading = false) {
        return await get(URL.externalLinkURL.bisProjectPrincipalInfo, p, showLoading)
    }
    //登录接口
    async getToken(p, showLoading = false) {
        return await get(URL.externalLinkURL.login, p, showLoading)
    }
    // 获取 商家管理 列表
    async getMerchantList(p, showLoading = false) {
        return await get(URL.externalLinkURL.merchansList, p, showLoading)
    }
    // 获取 商家管理-业态 列表
    async getFormatList(p, showLoading = false) {
        return await get(URL.externalLinkURL.merchansFormatList, p, showLoading)
    }
    // 获取 商家管理-商家信息
    async getMerchantDetail(p, showLoading = false) {
        return await get(URL.externalLinkURL.bismerchanformatsbigsList, p, showLoading)
    }
    // 获取 商家管理-商家比较列表
    async getMerchantCompareDetail(p, showLoading = false) {
        return await get(URL.externalLinkURL.bismerchantsummarybigsList, p, showLoading)
    }
    // 获取 商家管理-商家比较echart
    async getListLineChart(p, showLoading = false) {
        return await get(URL.externalLinkURL.bismerchantsummarybigsListLineChart, p, showLoading)
    }
    //获取招商进度的项目
    async getMakeBusnessProjectList(p, showLoading = false) {
        return await get(URL.externalLinkURL.selectProjectList, p, showLoading)
    }
}
const externalLinkServe = new externalLink()
export default externalLinkServe