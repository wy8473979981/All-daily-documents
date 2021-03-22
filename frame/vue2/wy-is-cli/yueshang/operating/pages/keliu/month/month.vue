<template>
	<view>
		<app-header>
			<app-project-selector disabled-all :selected="selectedProj" @selected="onProjectSelected"></app-project-selector>
			<view slot="right" style="display: flex">
				<app-date-picker :fromDate="queryModel.yearAndMonth" fields="year" @changed="onDateChanged"></app-date-picker>
			</view>
		</app-header>

		<!-- <view class="updata-time">数据更新时间：{{ updateTime }} 数据来源系统：PMS系统</view> -->

		<view class="wrapper">
			<app-section :collapseable="collapseable">
				<view class="head-actions_left_view" slot="head-actions_left">
					<app-filter-chartdialog :title="chartsTitle" :items="items" @chartselected="onChartSelectedChange"> </app-filter-chartdialog>
				</view>
				<app-echarts height="400rpx" :options="lineops" canvasId="keliupro"></app-echarts>
			</app-section>
		</view>

		<view class="wrapper" style="margin-top: 12rpx; margin-bottom: 120rpx">
			<app-section title="月客流排名（单位：万人）">
				<view slot="head-actions">
					<view class="list-mode">
						<text :class="'list-mode-item ' + (table.mode === 'month' ? 'active' : '')" @tap="onListModeChanged" data-value="month">当月</text>｜
						<text :class="'list-mode-item ' + (table.mode === 'year' ? 'active' : '')" @tap="onListModeChanged" data-value="year">年累计</text>
					</view>
				</view>
				<app-table :fixednum="1" :values="table.dataList" :columns="table.columns"> </app-table>
			</app-section>
		</view>

		<view class="bottom-bar">
			<view class="bottom-button" @tap="gotoJiankong">客流监控</view>
		</view>
	</view>
</template>

<script>
// pages/shuju/keliu/paiming.js
const app = getApp();
import regeneratorRuntime from "@/utils/runtime";
const monthColumns = [
	{
		label: "月份",
		key: "month",
		width: "140",
		align: "left",
	},
	{
		label: "工作日",
		key: "gzr",
		sortable: true,
		width: "140",
		align: "right",
	},
	{
		label: "节假日",
		key: "jjr",
		sortable: true,
		width: "140",
		align: "right",
	},
	{
		label: "客流密度",
		key: "stl",
		sortable: true,
		width: "180",
		align: "right",
	},
	{
		label: "日均客流",
		key: "rpj",
		sortable: true,
		width: "180",
		align: "right",
	},
	{
		label: "客流",
		key: "kl",
		sortable: true,
		width: "140",
		align: "right",
	},
	{
		label: "同比",
		unit: "%",
		key: "tb",
		width: "130",
		sortable: true,
		align: "right",
	},
	{
		label: "达成率",
		key: "dcl",
		width: "130",
		sortable: true,
		align: "right",
	},
];
const yearColumns = [
	{
		label: "月份",
		key: "month",
		align: "left",
		width: "150",
	},
	{
		label: "客流",
		key: "kl",
		sortable: true,
		width: "200",
		align: "right",
	},
	{
		label: "日均客流",
		key: "rpj",
		sortable: true,
		width: "180",
		align: "right",
	},
	{
		label: "同比",
		unit: "%",
		key: "tb",
		width: "200",
		sortable: true,
		align: "right",
	},
	{
		label: "达成率",
		key: "dcl",
		width: "200",
		sortable: true,
		align: "right",
	},
];
const keliuY = ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"];
const keliuS = ["10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00"];
import appHeader from "@/components/common/header";
import appProjectSelector from "@/components/selector/project";
import appSection from "@/components/container/section";
import appEcharts from "@/components/echarts/echarts";
import appTable from "@/components/table/index";
import appFilterDialog from "@/components/filter/dialog";
import appDatePicker from "@/components/selector/datepicker";
import appFilterChartdialog from "@/components/filter/chartdialog";
export default {
	data() {
		return {
			chartsType: "xm",
			chartsTitle: "项目客流(人)",
			items: [
				{
					title: "项目客流",
					type: "xm",
					value: "",
					unit: "人",
				},
				{
					title: "客流密度",
					type: "kl",
					value: "",
					unit: "人/天/㎡",
				},
			],
			queryModel: {
				bisProjectId: null,
				yearAndMonth: null,
			},
			updateTime: null,
			collapseable: true,
			lineops: {
				decimals: "paiming",
				unit: "%",
				xAxis: {
					type: "category",
					boundaryGap: false,
					data: keliuY,
				},
				yAxis: {
					type: "value",
					boundaryGap: false,
				},
				series: [
					{
						type: "line",
						lineStyle: {
							color: "#3AABFF",
						},
						areaStyle: {
							color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
								{
									offset: 0,
									color: "#CFDFFE",
								},
								{
									offset: 1,
									color: "#FFFFFF",
								},
							]),
						},
					},
					{
						type: "line",
						lineStyle: {
							color: "#9BB3C6",
						},
					},
				],
				legend: {
					data: [],
				},
			},
			table: {
				mode: "month",
				columns: monthColumns,
				dataList: [],
			},
			pro_currentDay: [],
			pro_yesterDay: [],
			stlchart: [],
			preStlchart: [],
			monthData: [],
			yearData: [],
			selectedProj: {},
		};
	},

	components: {
		appHeader,
		appProjectSelector,
		appSection,
		appEcharts,
		appTable,
		appFilterDialog,
		appDatePicker,
		appFilterChartdialog,
	},
	props: {},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		this.setData({
			// updateTime: (date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()),
			selectedProj: {
				label: options.projectName,
				value: options.bisProjectId,
			},
			"queryModel.bisProjectId": options.bisProjectId,
			"queryModel.yearAndMonth": options.yearMonth,
			"queryModel.yearMonth": options.yearAndMonth,
			//默认显示客流密度信息
		});
		this.queryData();
	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function () {},
	methods: {
		onProjectSelected(e) {
			// console.log(e)
			if (e.detail.label !== "全部") {
				this.setData({
					"queryModel.bisProjectId": e.detail.value.bisProjectId,
				});
				this.queryData();
			}
		},
		onDateChanged(e) {
			this.setData({
				"queryModel.yearAndMonth": e.detail.value,
			});
			this.queryData();
		},
		onListModeChanged(e) {
			const mode = e.target.dataset.value;
			if (this.table.mode !== mode) {
				this.setData({
					"table.mode": mode,
					"table.columns": mode === "month" ? monthColumns : yearColumns,
					"table.dataList": mode === "month" ? this.monthData : this.yearData,
				});
			}
		},
		gotoJiankong() {
			app.globalData.page.go("../jiankong/jiankong", {
				bisProjectId: this.queryModel.bisProjectId,
				projectName: this.selectedProj.label,
			});
		},
		queryData() {
			app.globalData.request
				.options({
					loading: true,
				})
				.get("/open/bis-open-report!pfOfMon.action", this.queryModel)
				.then((res) => {
					const data = res.data;
					let { preStlchart, stlchart, dataArr, pro_currentDay, pro_yesterDay } = data;
					let year = this.queryModel.yearAndMonth.split('-')[0];
					let preYear = year - 1;
					const pf = data.pf; // 月数据
					let mData = []; // 年数据
					let yData = [];
					for (let i = 0, len = pf.length; i < len; i++) {
						const arr = pf[i];
						mData.push({
							month: arr[16],
							gzr: arr[10],
							jjr: arr[11],
							stl: arr[12],
							kl: arr[4],
							tb: arr[6],
							dcl: arr[8],
							rpj: arr[18],
						});
						yData.push({
							month: arr[16],
							kl: arr[5],
							tb: arr[7],
							dcl: arr[9],
							rpj: arr[18],
						});
					}
					this.setData({
						monthData: mData,
						yearData: yData,
						"table.dataList": this.table.mode === "month" ? mData : yData,
						preStlchart,
						stlchart,
						dataArr,
						pro_currentDay,
						pro_yesterDay,
					});
					// 设置项目客流折线
					/**
					 * preStlchart : 上一年客流密度列表
					 * stlchart:当年客流密度列表
					 * dataArr：时间段区间
					 * pro_currentDay：当天项目客流
					 * pro_yesterDay：昨日项目客流
					 * */
					if (this.chartsType === "xm") {
						this.setData({
							"lineops.xAxis.data": keliuS,
							"lineops.legend.data": [{ name: "昨天" }, { name: "今天" }],
							"lineops.series[0].data": pro_yesterDay,
							"lineops.series[0].name": "昨天",
							"lineops.series[1].name": "今天",
							"lineops.series[1].data": pro_currentDay,
						});
					} else {
						if (typeof preStlchart === "string") {
							preStlchart = [];
						}
						if (typeof stlchart === "string") {
							stlchart = [];
						}
						this.setData({
							"lineops.legend.data": [{ name: year + "年" }, { name: preYear + "年" }],
							"lineops.xAxis.data": keliuY,
							"lineops.series[0].data": preStlchart,
							"lineops.series[0].name": preYear + "年",
							"lineops.series[1].name": year + "年",
							"lineops.series[1].data": stlchart,
						});
					}
				});
		},

		//图表左上角切换选项
		async onChartSelectedChange(e) {
			let type = e.detail.type;
			let year = this.queryModel.yearAndMonth.split('-')[0];
			let preYear = year - 1;
			this.chartsType = type;
			if (type === "xm") {
				this.setData({
					"lineops.xAxis.data": keliuS,
					"lineops.legend.data": [{ name: "昨天" }, { name: "今天" }],
					"lineops.series[0].data": this.pro_yesterDay,
					"lineops.series[0].name": "昨天",
					"lineops.series[1].name": "今天",
					"lineops.series[1].data": this.pro_currentDay,
				});
			} else {
				if (typeof this.preStlchart === "string") {
					this.setData({
						preStlchart: [],
					});
				}
				if (typeof this.stlchart === "string") {
					this.setData({
						stlchart: [],
					});
				}
				this.setData({
					"lineops.xAxis.data": keliuY,
					"lineops.legend.data": [{ name: year + "年" }, { name: preYear + "年" }],
					"lineops.series[0].data": this.preStlchart,
					"lineops.series[0].name": year + "年",
					"lineops.series[1].name": preYear + "年",
					"lineops.series[1].data": this.stlchart,
				});
			}
		},
	},
};
</script>
<style>
@import "./month.css";
</style>
