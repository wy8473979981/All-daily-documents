/* eslint-disable */
/**
 * @author fhj
 * @desc 页面自动化注册
 * @important 此文件禁止手动修改！
 */
// 路由配置
import Layout from '@/layout'
const menusList = {
    approvaldetails: () => import( /* webpackChunkName: "views/approvaldetails" */ "./approvaldetails/index.vue"),
    arrearageRank: () => import( /* webpackChunkName: "views/arrearageRank" */ "./arrearageRank/index.vue"),
    bond: () => import( /* webpackChunkName: "views/bond" */ "./bond/index.vue"),
    brandDetails: () => import( /* webpackChunkName: "views/brandDetails" */ "./brandDetails/index.vue"),
    brandLibrary: () => import( /* webpackChunkName: "views/brandLibrary" */ "./brandLibrary/index.vue"),
    budgetAdjustmentDetails: () => import( /* webpackChunkName: "views/budgetAdjustmentDetails" */ "./budgetAdjustmentDetails/index.vue"),
    budgetAdjustmentList: () => import( /* webpackChunkName: "views/budgetAdjustmentList" */ "./budgetAdjustmentList/index.vue"),
    budgetGroupHome: () => import( /* webpackChunkName: "views/budgetGroupHome" */ "./budgetGroupHome/index.vue"),
    budgetHome: () => import( /* webpackChunkName: "views/budgetHome" */ "./budgetHome/index.vue"),
    budgetModule: () => import( /* webpackChunkName: "views/budgetModule" */ "./budgetModule/index.vue"),
    budgetOrganizationIncome: () => import( /* webpackChunkName: "views/budgetOrganizationIncome" */ "./budgetOrganizationIncome/index.vue"),
    budgetOrganizationList: () => import( /* webpackChunkName: "views/budgetOrganizationList" */ "./budgetOrganizationList/index.vue"),
    budgetaApproval: () => import( /* webpackChunkName: "views/budgetaApproval" */ "./budgetaApproval/index.vue"),
    carFlowRank: () => import( /* webpackChunkName: "views/carFlowRank" */ "./carFlowRank/index.vue"),
    collection: () => import( /* webpackChunkName: "views/collection" */ "./collection/index.vue"),
    customerFlowRank: () => import( /* webpackChunkName: "views/customerFlowRank" */ "./customerFlowRank/index.vue"),
    earlyWarning: () => import( /* webpackChunkName: "views/earlyWarning" */ "./earlyWarning/index.vue"),
    energyDetails: () => import( /* webpackChunkName: "views/energyDetails" */ "./energyDetails/index.vue"),
    errorPage401: () => import( /* webpackChunkName: "views/errorPage401" */ "./errorPage401/index.vue"),
    errorPage404: () => import( /* webpackChunkName: "views/errorPage404" */ "./errorPage404/index.vue"),
    financiaDetails: () => import( /* webpackChunkName: "views/financiaDetails" */ "./financiaDetails/index.vue"),
    financialVerification: () => import( /* webpackChunkName: "views/financialVerification" */ "./financialVerification/index.vue"),
    formDemo: () => import( /* webpackChunkName: "views/formDemo" */ "./formDemo/index.vue"),
    globalSearch: () => import( /* webpackChunkName: "views/globalSearch" */ "./globalSearch/index.vue"),
    group: () => import( /* webpackChunkName: "views/group" */ "./group/index.vue"),
    groupingScheme: () => import( /* webpackChunkName: "views/groupingScheme" */ "./groupingScheme/index.vue"),
    home: () => import( /* webpackChunkName: "views/home" */ "./home/index.vue"),
    incomeRanking: () => import( /* webpackChunkName: "views/incomeRanking" */ "./incomeRanking/index.vue"),
    investmentPromotion: () => import( /* webpackChunkName: "views/investmentPromotion" */ "./investmentPromotion/index.vue"),
    investmentPromotionProgress: () => import( /* webpackChunkName: "views/investmentPromotionProgress" */ "./investmentPromotionProgress/index.vue"),
    investmentPromotionRanking: () => import( /* webpackChunkName: "views/investmentPromotionRanking" */ "./investmentPromotionRanking/index.vue"),
    invoiceDetails: () => import( /* webpackChunkName: "views/invoiceDetails" */ "./invoiceDetails/index.vue"),
    invoiceList: () => import( /* webpackChunkName: "views/invoiceList" */ "./invoiceList/index.vue"),
    leaseContractDetails: () => import( /* webpackChunkName: "views/leaseContractDetails" */ "./leaseContractDetails/index.vue"),
    leaseContractList: () => import( /* webpackChunkName: "views/leaseContractList" */ "./leaseContractList/index.vue"),
    login: () => import( /* webpackChunkName: "views/login" */ "./login/index.vue"),
    main: () => import( /* webpackChunkName: "views/main" */ "./main/index.vue"),
    mini: () => import( /* webpackChunkName: "views/mini" */ "./mini/index.vue"),
    multipathList: () => import( /* webpackChunkName: "views/multipathList" */ "./multipathList/index.vue"),
    pinZhengGuanli: () => import( /* webpackChunkName: "views/pinZhengGuanli" */ "./pinZhengGuanli/index.vue"),
    projectHome: () => import( /* webpackChunkName: "views/projectHome" */ "./projectHome/index.vue"),
    redirect: () => import( /* webpackChunkName: "views/redirect" */ "./redirect/index.vue"),
    rentalSchemeForm: () => import( /* webpackChunkName: "views/rentalSchemeForm" */ "./rentalSchemeForm/index.vue"),
    saleRanking: () => import( /* webpackChunkName: "views/saleRanking" */ "./saleRanking/index.vue"),
    shopPreparationList: () => import( /* webpackChunkName: "views/shopPreparationList" */ "./shopPreparationList/index.vue"),
    subjectConfig: () => import( /* webpackChunkName: "views/subjectConfig" */ "./subjectConfig/index.vue"),
    takeShop: () => import( /* webpackChunkName: "views/takeShop" */ "./takeShop/index.vue"),
    vipRank: () => import( /* webpackChunkName: "views/vipRank" */ "./vipRank/index.vue"),
    voucherDetails: () => import( /* webpackChunkName: "views/voucherDetails" */ "./voucherDetails/index.vue"),
    water: () => import( /* webpackChunkName: "views/water" */ "./water/index.vue"),
    Layout
};
export default menusList;