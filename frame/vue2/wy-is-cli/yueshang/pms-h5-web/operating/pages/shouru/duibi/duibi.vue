<template>
	<view class="duibi">
		<app-header>
			<!-- 全部 -->
			<view slot="right" class="slot-right" v-if="recovery.show">
				<app-picker @changed="onDateChanged" fields="month" :fromDate="params.yearMonth || params.yearAndMonth" v-if="params.type !== 'kl'"></app-picker>
				<app-picker @changed="onDateChanged" fields="day" :fromDate="params.yearMonthDay" v-if="params.type === 'kl'"></app-picker>
				<view class="header-right-select">
					<app-filter-dialog :checkboxes="projectList" @selected="showComparisonList" tip="注意：最少选两项" title="项目筛选"> </app-filter-dialog>
				</view>
			</view>
		</app-header>
		<app-section title="项目排名">
			<view slot="head-actions">
				<view class="select-indicator">
					<view :class="'mount ' + (timeSpan === '2' ? 'active' : '')" @tap="changeSpan" data-span="2" v-if="params.type === 'kl'"> 当日 </view>
					<view class="line" v-if="params.type === 'kl'"> | </view>
					<view :class="'mount ' + (timeSpan === '0' ? 'active' : '')" @tap="changeSpan" data-span="0"> 当月 </view>
					<view class="line"> | </view>
					<view :class="'year ' + (timeSpan === '1' ? 'active' : '')" @tap="changeSpan" data-span="1"> 年累计 </view>
				</view>
			</view>
			<app-lengthways :values="dataList" :cross="cross"></app-lengthways>
		</app-section>
		<view class="button-tran" @tap="timeFrame" v-if="params.type === 'kl'"> 时段客流对比图 </view>
	</view>
</template>

<script>
// pages/shouru/duibi/duibi.js
const app = getApp();
import appSection from "@/components/container/section";
import appFilterDialog from "@/components/filter/dialog";
import appHeader from "@/components/common/header";
import appLengthways from "@/components/table/lengthways";
import appPicker from "@/components/selector/datepicker";

export default {
	data() {
		return {
			timeSpan: "0",
			dataList: [],
			cross: [],
			srCrossM: [
				{
					key: "projectName",
				},
				{
					label: "应收(万元)",
					key: "curMonthMust",
				},
				{
					label: "收入(万元)",
					key: "curMonthFact",
				},
				{
					label: "收缴率(权责)",
					key: "curMonthColRate",
				},
				{
					label: "收缴率(合同)",
					key: "sjHtMonthRate",
				},
				{
					label: "同比",
					key: "mtm",
				},
				{
					label: "预算达成率",
					key: "comRate",
				},
			],
			srCrossY: [
				{
					key: "projectName",
				},
				{
					label: "应收(万元)",
					key: "curYearMust",
				},
				{
					label: "收入(万元)",
					key: "curYearFact",
				},
				{
					label: "收缴率(权责)",
					key: "curYearColRate",
				},
				{
					label: "收缴率(合同)",
					key: "sjHtYearRate",
				},
				{
					label: "同比",
					key: "yty",
				},
				{
					label: "预算达成率",
					key: "comRateYTD",
				},
			],
			klCrossM: [
				{
					key: "name",
				},
				{
					label: "客流密度",
					key: "stlMonth",
				},
				{
					label: "客流（万人）",
					key: "flowMonth",
				},
				{
					label: "同比",
					key: "tbMonth",
				},
				{
					label: "达成率",
					key: "dclMonth",
				},
			],
			klCrossY: [
				{
					key: "name",
				},
				{
					label: "客流密度",
					key: "stlYear",
				},
				{
					label: "客流（万人）",
					key: "flowYear",
				},
				{
					label: "同比",
					key: "tbYear",
				},
				{
					label: "达成率",
					key: "dclYear",
				},
			],
			klCrossD: [
				{
					key: "name",
				},
				{
					label: "当日客流（万人）",
					key: "currDay",
				},
				{
					label: "昨日客流（万人）",
					key: "preDay",
				},
				{
					label: "昨日环比",
					key: "preDayHb",
				},
			],
			groups: [],
			projectList: [],
			params: {},
			list: "",
			recovery: { show: true },
		};
	},

	components: {
		appSection,
		appFilterDialog,
		appHeader,
		appLengthways,
		appPicker,
	},
	props: {},
	onLoad: function (options) {
		let cross = [];

		if (options.type !== "kl") {
			cross = this.srCrossM;
		} else {
			cross = this.klCrossM;
		}

		this.setData({
			params: options,
			cross,
		}); // this.getStoreType();
		if (options.type !== "kl") {
			this.getDataList();
		} else {
			this.getKeliu();
		}
	},
	methods: {
		changeSpan(e) {
			const span = e.currentTarget.dataset.span;
			this.setData({
				timeSpan: span,
			});

			if (this.params.type === "kl") {
				if (span === "0") {
					this.setData({
						cross: this.klCrossM,
					});
				} else if (span === "1") {
					this.setData({
						cross: this.klCrossY,
					});
				} else {
					this.setData({
						cross: this.klCrossD,
					});
				}
			} else {
				if (span === "0") {
					this.setData({
						cross: this.srCrossM,
					});
				} else {
					this.setData({
						cross: this.srCrossY,
					});
				}
			}
		},

		async getDataList() {
			let params = Object.assign({}, this.params); // params.yearAndMonth = "";

			let res = await app.globalData.request
				.options({
					loading: true,
				})
				.get("/open/bis-open-month-rate!monthRate.action", this.params);
			let projectList = res.data.monthCollectionRateList
				.map((item) => {
					return { ...item, label: item.projectName };
				})
				.slice(1);
			let result = res.data.monthCollectionRateList.filter((item) => {
				return this.params.ids.includes(item.bisProjectId);
			});
			this.setData({
				list: res.data.monthCollectionRateList,
				dataList: result,
				projectList,
			});
		},

		async getKeliu() {
			let params = Object.assign({}, this.params);
			let { ids, yearMonthDay, yearAndMonth } = params;
			params.bisProjectIds = this.params.ids; // params.yearMonth = "";

			let res = await app.globalData.request
				.options({
					loading: true,
				})
				.get("/open/bis-open-report!pfOfMonOrYearProject.action", {
					bisProjectIds: ids,
					yearMonthDay,
					yearAndMonth,
				}); // 获取所有项目

			let res1 = await app.globalData.request
				.options({
					loading: true,
				})
				.get("/open/bis-open-report!pfOfMonOrYear.action", params);
			let list = res1.data.pfOfMon.pfMon
				.map((item) => {
					return {
						label: item[1],
						bisProjectId: item[0],
					};
				})
				.slice(1);
			this.setData({
				dataList: res.data,
				projectList: list,
			});
		},

		onDateChanged(e) {
			this.setData({
				["params.yearMonth"]: e.detail.value,
				["params.yearAndMonth"]: e.detail.value,
			});

			if (this.params.type === "kl") {
				this.getKeliu();
			} else {
				this.getDataList();
			}
		},

		bindselected(e) {
			e.detail.forEach((item) => {
				let temp = item.split("-");
				let key = temp[0];
				let value = temp[1];

				if (key === "storeType") {
					this.setData({
						["params.storeType"]: value,
					});
				}

				if (key === "stage") {
					this.setData({
						"params.stage": value,
					});
				}
			});
			this.getDataList();
		},

		showComparisonList(e) {
			console.log(e.detail);
			let ids = e.detail.map((item) => item.bisProjectId).join(",");
			this.setData({
				["params.ids"]: ids,
			});
			if (this.params.type === "kl") {
				this.getKeliu();
				return;
			} else {
				let result = this.list.filter((item) => {
					return this.params.ids.includes(item.bisProjectId);
				});
				this.setData({
					dataList: result,
				});
			}
		},

		// 获取搜索物业类型枚举
		async getStoreType() {
			let res = await app.globalData.request
				.options({
					loading: true,
				})
				.get("/open/bis-open-dict!chargeTypeList.action");
			let result = res.data.map((item) => {
				return {
					label: item.name,
					value: "storeType-" + item.code,
					selected: item.code === this.params.storeType,
				};
			});
			let group = {
				label: "物业类型",
				items: result,
				maxnum: 1,
			};
			let groups = this.groups;
			groups.push(group);
			this.setData({
				groups,
			});
		},

		// 跳转到时段客流对比
		timeFrame() {
			app.globalData.page.go("./timeframe", {
				ids: this.params.ids,
			});
		},
	},
};
</script>
<style>
@import "./duibi.css";
</style>
