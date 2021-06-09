// API配置文件
const API = {
	appGoodsAvailable: 'operatingWeb/appGoods/findMarketingUnSoldValue.htm', // 营销数据-首页
	getWechat: 'dynamicValueWeb/appGoodsAvailable/getWeiXinSignature.htm', // 获取微信授权信息-签名
	findContactUser: 'dynamicValueWeb/appGoodsAvailable/findContactUser.htm', // 获取可售货值相关联系人
	getUserId: 'dynamicValueWeb/appGoodsAvailable/getQyWeiXinUserId.htm' ,// 获取userId
	
    appSignAndPaymentByOverview: 'operatingWeb/appSignAndPayment/selectOverviewData.htm', // 签约回款数据接口-概览
    appSignAndPaymentByDept: 'operatingWeb/appSignAndPayment/selectDeptData.htm', // 签约回款数据接口-事业部
	appSignAndPaymentByMarketing: 'operatingWeb/appSignAndPayment/selectMarketingData.htm', // 签约回款数据接口-营销组
    appSignAndPaymentByProjectDept: 'operatingWeb/appSignAndPayment/selectProjectDataByDept.htm', // 签约回款数据接口-项目
	appSignAndPaymentByProjectMarket: 'operatingWeb/appSignAndPayment/selectProjectDataByMarket.htm', // 签约回款数据接口-项目
    appSignAndPaymentByDetail: 'operatingWeb/appSignAndPayment/selectDetailData.htm', // 签约回款数据接口-详情

    appRegulateFunBalanceDept: 'reportWeb/regulateFunBalance/selectFinanceDeptData.htm', // 资金效能考核-事业部
    appRegulateFunBalanceDeptSum: 'reportWeb/regulateFunBalance/selectFinanceDeptDataSum.htm', // 资金效能考核-汇总
    appRegulateArrearsDept: 'reportWeb/regulateFunBalance/selectArrearsDeptData.htm', // 欠款回款考核-事业部

	// 供货相关
	supplySummary: 'operatingWeb/supply/summary.htm', //供货数据汇总-首页
	supplyDivisions: 'operatingWeb/supply/divisions.htm', // 供货事业部列表
	supplyProjects: 'operatingWeb/supply/projects.htm', // 供货项目列表
	supplyProject: 'operatingWeb/supply/project.htm', // 供货项目详情

    //库存去化
    goodsMoreOneYearSummary : 'dynamicValueWeb/goodsAgeApp/goodsMoreOneYearSummary.htm',
    goodsMoreOneYearGroup : 'dynamicValueWeb/goodsAgeApp/goodsMoreOneYearGroup.htm',
    goodsMoreOneYearProject : 'dynamicValueWeb/goodsAgeApp/goodsMoreOneYearProject.htm',

    getBusinessAndParkingIndex : 'dynamicValueWeb/goodsAgeBusiness/getGoodsAgeIndex.htm',
    getBusinessAndParkingDetail : 'dynamicValueWeb/goodsAgeBusiness/getGoodsAgeData.htm',
}

export default API;
