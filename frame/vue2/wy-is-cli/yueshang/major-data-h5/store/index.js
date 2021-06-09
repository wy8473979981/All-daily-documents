import Vue from 'vue'
import Vuex from 'vuex'
import {
	request
} from '@/common/http'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		isFullCal: false, // true全口径、false权益口径
		userId: null, // 用户userId
		watermarkText: '',
		availablePageTipsList: [{
			title: '1 全地产项目可售未售货值清单，为系统真实数据。'
		}, {
			title: '2 此数据为今天凌晨 0点 系统数据。下次更新时间是明天凌晨 0点。'
		}, {
			title: '3 营销操盘部分数据来自于明源，非营销操盘数据来自每日上报。'
		}],
		supplyPageTipsList: [{
			title: '1 全地产项目动态供货清单，为系统真实数据。'
		}, {
			title: '2 此数据为今天凌晨 0点 系统数据。下次更新时间是明天凌晨 0点。'
		}, {
			title: '3 供货实际值来自房源管理，年度计划指标值来年初供货计划。'
		}, {
			title: '4 红绿灯：截至上月累计实际供货不低于计划指标值为绿灯，反之为红灯。'
		}],
		signPageTipsList: [{
			title: '1 全地产项目动态签约清单，为系统真实数据。'
		}, {
			title: '2 此数据为今天凌晨 0点 系统数据。下次更新时间是明天凌晨 0点。'
		}, {
			title: '3 签约实际值来自营销日报，年度计划指标值来自年度计划(签批考核版)。'
		}, {
			title: '4 红绿灯： 截至上月累计实际签约不低于计划指标值为绿灯，反之为红灯。'
		}],
		paymentPageTipsList: [{
			title: '1 全地产项目动态回款清单，为系统真实数据。'
		}, {
			title: '2 此数据为今天凌晨 0点 系统数据。下次更新时间是明天凌晨 0点。'
		}, {
			title: '3 回款实际值来自营销日报，年度计划指标值来自年度计划(签批考核版)。'
		}, {
			title: '4 红绿灯: 截至上月累计实际回款不低于指计划标值为绿灯，反之为红灯。'
		}],
		balancePageTipsList: [{
			title: '1 当月考核的监管资金余额目标 = （前5个月累计销售回款（全口径）+当月28日回款（全口径））*监管比例。'
		}, {
			title: '2 每周动态监控的监管资金余额目标 = (前5个月累计实际销售回款（全口径）+本月截止上周回款（全口径）） *监管比例。'
		}, {
			title: '3 当月监控激励 = （当月28日全口径监管资金余额-当月考核的监管资金余额目标）*奖罚系数。'
		}, {
			title: '4 超额奖励系数0.05‰；缺口罚款系数0.025‰。'
		}],
		arrearsPageTipsList: [{
			title: '1 本月欠款回款目标=(当月期初销售欠款-当月未达工程条件金额-当月分期付款未到期金额)'
		}, {
			title: '2 奖罚金额=差额*奖罚系数'
		}, {
			title: '3 奖罚系数：超额奖励系数0.5‰；缺口罚款系数*0.3‰'
		}],
        valuePageTipsList:[{
			title:'1 20年结转货值和21年新增货值依据《二类考核指标》签批文件录入'
		},{
			title:'2 实际数据来自营销定期更新'
		},{
			title:'3 红绿灯: 截至上月累计实际回款不低于指计划标值为绿灯，反之为红灯。'
		}],
    },
	getters: {

	},
	mutations: {
		setIsFullCal(state, payload) {
			state.isFullCal = !state.isFullCal
		},
		setUserId(state, payload) {
			state.userId = payload
		}
	},
	actions: {

	}
})


export default store
