const URL = {
    homeURL: {
        // 营运数据 - 首页
        queryRentFeeTotal: "/plpms-report/bis/rent-fee/queryRentFeeTotal", // 根据年月、物业类型、费项(1租金,2物管,3多经,默认1),查询 租金收入、物管收入、 多经收入 汇总数据
        queryPassengerFlowData: "/plpms-report/bis/passengerFlowRanking/queryPassengerFlowData", // 查询客流模块汇总数据
        querySaleFlowData: "/plpms-report/bis/sale/queryCarFlowData", // 查询销售模块汇总数据
        queryCarFlowData: "/plpms-report/bis/carFlow/queryCarFlowData", // 查询车流模块汇总数据
        queryZsTotal: "/plpms-report/bis/zs/queryZsTotal", // 招商 首页 汇总数据
        queryOweFeeData: "/plpms-report/bis/oweFeeProject/queryOweFeeData", // 查询欠费模块汇总数据
        queryLeaseExpiresTotal: "/plpms-report/bis/lease-expires/queryTotal", // 租约到期 根据物业类型查询,租约到期汇总数据
        queryCoverRentTotal: "/plpms-report/bis/cover-rent/queryTotal", // 押不抵租 根据物业类型查询,押不抵租汇总数据
    },
    keliuURL: {
        queryPassengerFlowLineChart: "/plpms-report/bis/monthlyPassengerFlowDetailsOfProject/queryPassengerFlowLineChart", // 客流排名 - 查询项目客流、客流密度折线图
        queryPassengerFlowForPassengerFlowRanking: "/plpms-report/bis/passengerFlowRanking/queryPassengerFlowForPassengerFlowRanking",  // 客流排名 - 查询项目排名
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
        queryOweFeeRanking: "/plpms-report/bis/oweFeeProject/queryOweFeeRanking",  // 欠费 - 欠费排名
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
        pdWx: "http://pms.powerlong.com/PowerDesk/open/bis-mini-app!pdWx.action", // 获取所有的项目列表
        getYunYingGeneralMemberInfo: "http://pd.powerlong.com/open/bis-open-statistics!getYunYingGeneralMemberInfo.action", // 获取会员汇总信息
        basicMemberData: "https://proservice.powerlong.com/pms/statistics/memberStatistics/basicMemberData", // 会员--整体概况
        memberRatio: "https://proservice.powerlong.com/pms/statistics/memberStatistics/memberRatio", // 注册渠道占比、会员性别占比、会员等级占比
        memberFeature: "https://proservice.powerlong.com/pms/statistics/memberStatistics/memberFeature", // 获取会员pie
        memberAge: "https://proservice.powerlong.com/pms/statistics/memberStatistics/memberAge", // 获取会员年龄分布
        pointsRatio: "https://proservice.powerlong.com/pms/statistics/memberStatistics/pointsRatio", // 积分产出占比
        consumeCategoryDistribution: "https://proservice.powerlong.com/pms/statistics/memberStatistics/consumeCategoryDistribution", // 消费业态分布
        bisProjectPrincipalInfo: "http://demo.powerlong.com/PowerDesk/open/bis-open-report!bisProjectPrincipalInfo.action", //项目总弹窗信息
        login: "http://demo.powerlong.com/PowerDesk/wap/pd-app!login.action", //登录接口
        merchansList: "http://pms.powerlong.com/merchant_applets_web/api/v1/report/bis/merchans/formats/bigs/list", // 获取 商家管理 列表
        merchansFormatList: "http://pms.powerlong.com/merchant_applets_web/api/v1/report/bis/formats/bigs/list", // 获取 商家管理-业态 列表
        bismerchanformatsbigsList: "http://pms.powerlong.com/merchant_applets_web/api/v1/report/shangguans/bismerchanformatsbigs/list", // 获取 商家管理-商家信息
        bismerchantsummarybigsList: "http://pms.powerlong.com/merchant_applets_web/api/v1/report/shangguans/bismerchantsummarybigs/list", // 获取 商家管理-商家比较列表
        bismerchantsummarybigsListLineChart: "http://pms.powerlong.com/merchant_applets_web/api/v1/report/shangguans/bismerchantsummarybigs/listLineChart", // 获取 商家管理-商家比较echart
        selectProjectList: "http://pd.powerlong.com/open/bis-open-dict!selectProjectList.action", //获取招商进度的项目


        investmentList: "https://pms.powerlong.com/plan_web/api/v1/report/bis/attract/investment/total/bigs/list",
        investmentsList: "https://pms.powerlong.com/plan_web/api/v1/report/bis/attracts/investments/deatils/bigs/list",
        rejectList: "https://pms.powerlong.com/plan_web/api/v1/report/bis/commissions/rejects/rates/bigs/rejectList",
        extractList: "https://pms.powerlong.com/plan_web/api/v1/report/bis/commissions/rejects/rates/bigs/extractList",
        summariesList: "https://pms.powerlong.com/plan_web/api/v1/report/bis/investments/performances/assessments/summaries/bigs/list",
        assessmentsProjectsList: "https://pms.powerlong.com/plan_web/api/v1/report/bis/investments/performances/assessments/projects/bigs/list",
        monitoringList: "https://pms.powerlong.com/plan_web/api/v1/report/bis/headquarters/brand/monitoring/detail/bigs/list",
        rentcompleteratetList: "https://pms.powerlong.com/plan_web/api/v1/report/bis/rentcompleterate/bigs/list",
        jcstlist: "https://pms.powerlong.com/plan_web/api/v1/report/bis/tobeopens/projects/merchantsteps/bigs/jcstlist",
        htbslist: "https://pms.powerlong.com/plan_web/api/v1/report/bis/tobeopens/projects/merchantsteps/bigs/htbslist",
        swqplist: "https://pms.powerlong.com/plan_web/api/v1/report/bis/tobeopens/projects/merchantsteps/bigs/swqplist",
    }


}

export { URL }