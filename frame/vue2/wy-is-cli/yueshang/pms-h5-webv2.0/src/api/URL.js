// 第三方接口API
let blMain1 = 'https://pms.powerlong.com/PowerDesk'
let blMain2 = 'https://proservice.powerlong.com'
let blMain3 = 'https://pmstest.powerlong.com'
if (process.env.NODE_ENV === "production") {
    blMain1 = 'http://pd.powerlong.com'
    blMain2 = 'https://proservice.powerlong.com'
    blMain3 = 'http://pms.powerlong.com'
}

// https://demo.powerlong.com/PowerDesk ----- https://pd.powerlong.com
// https://proservice.powerlong.com -------  https://proservice.powerlong.com
// https://pmstest.powerlong.com  ---------  https://pms.powerlong.com

const URL = {
    homeURL: {
        // 营运数据 - 首页
        queryRentFeeTotal: "/plpms-report/bis/rent-fee/queryRentFeeTotal", // 根据年月、物业类型、费项(1租金,2物管,3多经,默认1),查询 租金收入、物管收入、 多经收入 汇总数据
        queryPassengerFlowData: "/plpms-report/bis/passengerFlowRanking/queryPassengerFlowData", // 查询客流模块汇总数据
        querySaleFlowData: "/plpms-report/bis/sale/queryCarFlowData", // 查询销售模块汇总数据
        queryCarFlowData: "/plpms-report/bis/carFlow/queryCarFlowData", // 查询车流模块汇总数据
        queryZsTotal: "/plpms-report/bis/zs/queryZsTotal", // 招商 首页 汇总数据
        queryOweFeeData: "/plpms-report/bis/oweFeeProject/queryOweFeeData", // 查询欠费模块汇总数据
        getYunYingGeneralMemberInfo: '/plpms-report/bis/member/queryMember',// 获取会员汇总信息
        getMemberList: '/plpms-report/bis/member/queryProjectMemberList',// 获取会员列表信息
        queryLeaseExpiresTotal: "/plpms-report/bis/lease-expires/queryTotal", // 租约到期 根据物业类型查询,租约到期汇总数据
        queryCoverRentTotal: "/plpms-report/bis/cover-rent/queryTotal", // 押不抵租 根据物业类型查询,押不抵租汇总数据
    },
    keliuURL: {
        queryPassengerFlowLineChart: "/plpms-report/bis/monthlyPassengerFlowDetailsOfProject/queryPassengerFlowLineChart", // 客流排名 - 查询项目客流、客流密度折线图
        queryPassengerFlowForPassengerFlowRanking: "/plpms-report/bis/passengerFlowRanking/queryPassengerFlowForPassengerFlowRanking", // 客流排名 - 查询项目排名
        queryMonthlyPassengerFlowRanking: "/plpms-report/bis/monthlyPassengerFlowDetailsOfProject/queryMonthlyPassengerFlowRanking", // 月客流 - 查询项目的月客流排名
        queryTotalDailyPassengerFlowInRecentSevenDays: "/plpms-report/bis/passengerFlowMonitoring/queryTotalDailyPassengerFlowInRecentSevenDays", // 客流监控 - 查询最近7天客流折线图
        queryPassengerFlowRecentThreeYears: "/plpms-report/bis/passengerFlowMonitoring/queryPassengerFlowRecentThreeYears", //客流监控 - 查询最近3年客流柱状图
        queryEvaluationIndex: "/plpms-report/bis/passengerFlowMonitoring/queryEvaluationIndex", // 客流监控 - 查询项目客流考核指标
        queryRankingOfItemsInDateRange: "/plpms-report/bis/passengerFlowDuringThePeriod/queryRankingOfItemsInDateRange", // 客流时段对比 - 查询项目排名
        queryTheNumberOfPassengersPerPeriodWithinTheDateRange: "/plpms-report/bis/passengerFlowDuringThePeriod/queryTheNumberOfPassengersPerPeriodWithinTheDateRange", // 客流时段对比 - 查询项目客流折线图
    },
    shouruURL: {
        queryCollectionRateList: "/plpms-report/bis/rent-fee/queryCollectionRateList", // 查询两年收缴率列表 - echart 数据  - 查询具体项目数据 传递 projectId
        queryRentFeeProjectList: "/plpms-report/bis/rent-fee/queryRentFeeProjectList", // 根据年月、物业类型、费项,查询租金,物管,多经 列表
        queryRentFeeProjectDetailsList: "/plpms-report/bis/rent-fee/queryRentFeeProjectDetailsList", // 根据年份、物业类型、费项、项目id，查询租金,物管,多经 列表（项目详情） - 具体项目的table数据
    },
    qianfeiURL: {
        queryOweFeeLineChart: "/plpms-report/bis/oweFeeProject/queryOweFeeLineChart", // 欠费 - 欠费折线图
        queryOweFeeRanking: "/plpms-report/bis/oweFeeProject/queryOweFeeRanking", // 欠费 - 欠费排名
        queryOweFeeAging: "/plpms-report/bis/oweFeeProject/queryOweFeeAging", // 欠费 - 当前欠费账龄
    },
    cashForRentURL: {
        queryTotal: "/plpms-report/bis/cover-rent/queryTotal",
        queryList: "/plpms-report/bis/cover-rent/queryList",
    },
    cheliuURL: {
        queryMonthlyCarFlowWhenCurYearAndlastYearByDate: "/plpms-report/bis/carFlow/queryMonthlyCarFlowWhenCurYearAndlastYearByDate",
        queryProjectRankingForCarFlow: "/plpms-report/bis/carFlow/queryProjectRankingForCarFlow",
    },
    saleURL: {
        querySaleEchart: "/plpms-report/bis/sale/querySaleEchart",
        queryProjectRankingByYS: "/plpms-report/bis/sale/queryProjectRankingByYS",
        queryBenefitsPerSquareMeterByYS: "/plpms-report/bis/sale-project/queryBenefitsPerSquareMeterByYS",
        queryEchartByYPS: "/plpms-report/bis/sale-project/queryEchartByYPS",
        queryBusinessSalesRanking: "/plpms-report/bis/sale-project/queryBusinessSalesRanking",
    },
    rentURL: {
        queryTotal: "/plpms-report/bis/lease-expires/queryTotal",
        queryList: "/plpms-report/bis/lease-expires/queryList",
    },
    makeBusinessURL: {
        queryOpenRateList: "/plpms-report/bis/zs/queryOpenRateList",
        queryOpenAndLeaseProjectList: "/plpms-report/bis/zs/queryOpenAndLeaseProjectList",
        queryOpenAndLeaseProjectDetailsList: "/plpms-report/bis/zs/queryOpenAndLeaseProjectDetailsList",
        queryEmptyStoreList: "/plpms-report/bis/zs/queryEmptyStoreList",
    },
    commonURL: {
        chargeTypeDict: "/plpms-report/bis/dict/chargeTypeDict", // 物业类型
        allDict: "/plpms-report/bis/dict/allDict", // 查询全部字典
    },
    externalLinkURL: {
        // 外链 接口
        pdWx: blMain1 + "/open/bis-mini-app!pdWx.action", // 获取所有的项目列表
        // getYunYingGeneralMemberInfo: blMain1 + "/open/bis-open-statistics!getYunYingGeneralMemberInfo.action", // 获取会员汇总信息
        basicMemberData: blMain2 + "/pms/statistics/memberStatistics/basicMemberData", // 会员--整体概况
        memberRatio: blMain2 + "/pms/statistics/memberStatistics/memberRatio", // 注册渠道占比、会员性别占比、会员等级占比
        memberFeature: blMain2 + "/pms/statistics/memberStatistics/memberFeature", // 获取会员pie
        memberAge: blMain2 + "/pms/statistics/memberStatistics/memberAge", // 获取会员年龄分布
        pointsRatio: blMain2 + "/pms/statistics/memberStatistics/pointsRatio", // 积分产出占比
        consumeCategoryDistribution: blMain2 + "/pms/statistics/memberStatistics/consumeCategoryDistribution", // 消费业态分布
        bisProjectPrincipalInfo: blMain1 + "/open/bis-open-report!bisProjectPrincipalInfo.action", //项目总弹窗信息
        login: blMain1 + "/wap/pd-app!login.action", //登录接口
    },
    makeBusiness: {
        selectProjectList: blMain1 + "/open/bis-open-dict!selectProjectList.action", //获取招商进度的项目

        investmentList: blMain3 + "/plan_web/api/v1/report/bis/attract/investment/total/bigs/list",
        investmentsList: blMain3 + "/plan_web/api/v1/report/bis/attracts/investments/deatils/bigs/list",
        rejectList: blMain3 + "/plan_web/api/v1/report/bis/commissions/rejects/rates/bigs/rejectList",
        extractList: blMain3 + "/plan_web/api/v1/report/bis/commissions/rejects/rates/bigs/extractList",
        summariesList: blMain3 + "/plan_web/api/v1/report/bis/investments/performances/assessments/summaries/bigs/list",
        assessmentsProjectsList: blMain3 + "/plan_web/api/v1/report/bis/investments/performances/assessments/projects/bigs/list",
        monitoringList: blMain3 + "/plan_web/api/v1/report/bis/headquarters/brand/monitoring/detail/bigs/list",
        rentcompleteratetList: blMain3 + "/plan_web/api/v1/report/bis/rentcompleterate/bigs/list",
        jcstlist: blMain3 + "/plan_web/api/v1/report/bis/tobeopens/projects/merchantsteps/bigs/jcstlist",
        htbslist: blMain3 + "/plan_web/api/v1/report/bis/tobeopens/projects/merchantsteps/bigs/htbslist",
        swqplist: blMain3 + "/plan_web/api/v1/report/bis/tobeopens/projects/merchantsteps/bigs/swqplist",
    },
    merchant: {
        merchansList: blMain3 + "/plan_web/api/v1/report/bis/merchans/formats/bigs/list", // 获取 商家管理 列表
        merchansFormatList: blMain3 + "/plan_web/api/v1/report/bis/formats/bigs/list", // 获取 商家管理-业态 列表
        bismerchanformatsbigsList: blMain3 + "/plan_web/api/v1/report/shangguans/bismerchanformatsbigs/list", // 获取 商家管理-商家信息
        bismerchantsummarybigsList: blMain3 + "/plan_web/api/v1/report/shangguans/bismerchantsummarybigs/list", // 获取 商家管理-商家比较列表
        bismerchantsummarybigsListLineChart: blMain3 + "/plan_web/api/v1/report/shangguans/bismerchantsummarybigs/listLineChart", // 获取 商家管理-商家比较echart
    },
    yusuanURL: {
        getZfgkSheet: blMain3 + "/budget/open/collectrate/queryPage",
        getZyzbSheet: blMain3 + "/budget/open/collecttarget/queryPage",
        getZjjhSheet: blMain3 + "/budget/open/capitalPlan/queryPage",
        getMjxxSheet: blMain3 + "/budget/open/collectbase/queryPage",
        getRsfySheet: blMain3 + "/budget/open/collectEmpfee/queryPage",
        getXzfySheet: blMain3 + "/budget/open/tmp/data/costsurvey/query",
        getRyxxSheet: blMain3 + "/budget/open/collectbaseEmp/queryPage",


        getBudgetInstanceSheet: blMain3 + "/budget/open/getBudgetInstanceSheet",
        getQhfSheet: blMain3 + "/budget/open/tmp/data/qhf/query",
        getEnergySheet: blMain3 + "/budget/open/tmp/data/energy/query",
        getCollectEmpSheet: blMain3 + "/budget/open/collectEmp/queryPage",
        getProjectSheet: blMain3 + "/budget/open/collectbaseProject/queryPage",
        getJfSheet: blMain3 + "/budget/open/tmp/data/deliverystat/query",
        getDcSheet: blMain3 + "/budget/open/tmp/data/propertystat/query"
    }


}

export { URL }
