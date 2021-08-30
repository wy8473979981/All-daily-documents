<template>
	<view class="shuju-qiankuan-details">
		<app-header :tabs="page.tabs" :tabActiveIndex="page.tabActiveIndex" @tab-changed="onTabChanged">
			<app-project-selector disabled-all :selected="selected" @selected="onProjectSelected"></app-project-selector>
			<view slot="right">
				<app-picker fields="month" @changed="onDateChanged" :from-date="query.yearAndMonth"></app-picker>
			</view>
		</app-header>
		<view class="qiankua-xiagnqing">
			<view class="qiankuan-item">
				<view class="qiankuan-item-title"> 30天以下 </view>
				<view class="qiankuan-item-num">
					<view class="item-num">{{ detail.oweStr0 }}</view>
					<view class="item-unit">万元</view>
				</view>
			</view>
			<view class="qiankuan-item">
				<view class="qiankuan-item-title"> 30-60天 </view>
				<view class="qiankuan-item-num">
					<view class="item-num">{{ detail.oweStr1 }}</view>
					<view class="item-unit">万元</view>
				</view>
			</view>
			<view class="qiankuan-item">
				<view class="qiankuan-item-title"> 60-90天 </view>
				<view class="qiankuan-item-num">
					<view class="item-num">{{ detail.oweStr2 }}</view>
					<view class="item-unit">万元</view>
				</view>
			</view>
			<view class="qiankuan-item">
				<view class="qiankuan-item-title"> 90天以上 </view>
				<view class="qiankuan-item-num">
					<view class="item-num">{{ detail.oweStr3 }}</view>
					<view class="item-unit">万元</view>
				</view>
			</view>
		</view>
		<app-section title="租金欠费（万元）" collapseable>
			<app-echarts :options="page.charts.main.options"></app-echarts>
		</app-section>

		<app-section title="欠费排名">
			<app-table :columns="page.table.columns" :values="page.table.rows" :total-row="page.table.totalRow" @row-click="onRowClick" :fixednum="2"></app-table>

			<view slot="head-actions">
				<view class="list-mode">
					<text :class="'list-mode-item ' + (page.table.mode === 'month' ? 'active' : '')" @tap="onListModeChanged" data-value="month">当月</text>｜
					<text :class="'list-mode-item ' + (page.table.mode === 'year' ? 'active' : '')" @tap="onListModeChanged" data-value="year">年累计</text>
				</view>
			</view>
		</app-section>
	</view>
</template>

<script>
const app = getApp();
import regeneratorRuntime from "@/utils/runtime";
const fixedColumns = [
	{
		label: "序号",
		key: "",
		width: "120rpx",
	},
	{
		label: "商家名",
		key: "month",
		align: "left",
		width: "220rpx",
		color: "#3A96BD",
	},
];
const monthColumns = [
	{
		label: "历史欠费(万元)",
		key: "lsqf",
		sortable: true,
		color: "#FD100E",
		align: "right",
		width: "220rpx",
	},
	{
		label: "欠费(万元)",
		key: "priceOfMonth",
		sortable: true,
		color: "#FD100E",
		align: "right",
		width: "220rpx",
	},
	{
		label: "清欠指标",
		key: "qqzb",
		sortable: true,
		align: "right",
		width: "180rpx",
	},
	{
		label: "清欠率",
		key: "yqql",
		sortable: true,
		align: "right",
		width: "180rpx",
	},
];
const yearColumns = [
	{
		label: "历史欠费(万元)",
		key: "lsqf",
		sortable: true,
		color: "#FD100E",
		align: "right",
		width: "220rpx",
	},
	{
		label: "清欠指标",
		key: "qqzb",
		sortable: true,
		align: "right",
		width: "180rpx",
	},
	{
		label: "清欠率",
		key: "nqql",
		sortable: true,
		align: "right",
		width: "180rpx",
	},
	{
		label: "欠费(万元)",
		key: "priceOfYear",
		sortable: true,
		align: "right",
		width: "220rpx",
	},
];
import appHeader from "@/components/common/header";
import appPicker from "@/components/selector/datepicker";
import appSection from "@/components/container/section";
import appFilterDialog from "@/components/filter/dialog";
import appProjectSelector from "@/components/selector/project";
import appTable from "@/components/table/index";
import appEcharts from "@/components/echarts/echarts";

export default {
	data() {
		return {
			selected: {},
			query: {
				type: "zj",
				attr: 1,
				yearAndMonth: "2020",
				storeType: "1",
			},
			page: {
				tabActiveIndex: 0,
				tabs: [
					{
						label: "租金欠费",
						value: "zj",
					},
					{
						label: "物管欠费",
						value: "wg",
					},
				],
				table: {
					mode: "month",
				},
				charts: {
					main: {},
				},
			},
			table: {
				mode: "month",
			},
			detail: {},
		};
	},

	components: {
		appHeader,
		appPicker,
		appSection,
		appFilterDialog,
		appProjectSelector,
		appTable,
		appEcharts,
	},
	props: {},
	onLoad: function (options) {
		this.setData({
			"query.storeType": options.storeType,
			"query.bisProjectId": options.bisProjectId,
			"query.yearAndMonth": options.yearMonth,
			"query.type": options.type || "zj",
			"page.tabActiveIndex": (options.type || "zj") === "zj" ? 0 : 1,
			["selected.label"]: options.projectName,
			["selected.value"]: options.bisProjectId,
		});
		this.loadData();
	},
	methods: {
		loadData: async function () {
			const url = "/open/bis-open-project!oweOfMonthByShop.action";
			const { data: res } = await app.globalData.request
				.options({
					loading: true,
				})
				.get(url, this.query);
			let totalRow = res.oweOfMon.owe.slice(0, 1).map((item) => {
				return {
					month: item[1],
					priceOfMonth: item[2] || "--",
					compareOfMonth: item[3] || "--",
					priceOfYear: item[4] || "--",
					nqql: item[9] || "--",
					yqql: item[8] || "--",
					lsqf: item[6] || "--",
				};
			})[0];
			const rows = res.oweOfMon.owe.slice(1).map((item) => {
				return {
					month: item[0],
					priceOfMonth: item[2] || "--",
					compareOfMonth: item[3] || "--",
					priceOfYear: item[4] || "--",
					nqql: item[9] || "--",
					yqql: item[8] || "--",
					lsqf: item[6] || "--",
				};
			});
			const setdata = {
				"page.charts.main.options": {
					unit: "万元",
					color: ["#FD100E"],
					legend: {
						data: [this.query.yearAndMonth],
					},
					xAxis: {
						type: "category",
						data: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
						splitLine: {
							show: true,
							lineStyle: {
								type: "dashed",
							},
						},
					},
					yAxis: {
						type: "value",
						splitLine: {
							show: false,
						},
					},
					series: [
						{
							type: "line",
							name: this.query.yearAndMonth.split("-")[0],
							data: JSON.parse(res.oweOfMon.owechart)
								.reverse()
								.map((num) => num),
							areaStyle: {
								color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
									{
										offset: 0,
										color: "#FFE1E1",
									},
									{
										offset: 1,
										color: "rgba(255,255,255,0.48)",
									},
								]),
							},
						},
					],
				},
				"page.table": {
					mode: "month",
					columns: [...fixedColumns, ...monthColumns],
					rows,
					totalRow,
				},
			};
			this.setData(setdata);
			this.getDetail();
		},

		onTabChanged(e) {
			if (e.detail.value === "wg") {
				this.page.tabActiveIndex = 1;
			} else {
				this.page.tabActiveIndex = 0;
			}
			this.setData({
				"query.type": e.detail.value,
			});
			this.loadData();
		},

		onProjectSelected(e) {
			this.setData({
				"query.bisProjectId": e.detail.value.bisProjectId,
			});
			this.loadData();
		},

		onDateChanged(e) {
			this.setData({
				"query.yearAndMonth": e.detail.value,
			});
			this.loadData();
		},

		onListModeChanged(e) {
			const mode = e.target.dataset.value;

			if (this.page.table.mode !== mode) {
				this.setData({
					"page.table.mode": mode,
					"page.table.columns": [...fixedColumns, ...(mode === "year" ? yearColumns : monthColumns)],
				});
			}
		},

		onRowClick(e) {
			uni.navigateToMiniProgram({
				appId: "wxa91ddcadeff6c927",
				target: "miniProgram",
				path: "pages/sjgl/sjgl?name=" + e.detail.row.month,
				envVersion: "release",

				success(res) {
					console.log(res); // 打开成功
				},
			}); // app.page.go("/pages/shuju/qiankuan/details", {
			// 	id: e.detail.id,
			// });
		},

		async getDetail() {
			let params = Object.assign({}, this.query);

			if (params.type === "zj") {
				params.type = 1;
			} else {
				params.type = 2;
			}

			let res = await app.globalData.request
				.options({
					loading: true,
				})
				.get("/open/bis-open-report!getProjectOther.action", params);
			this.setData({
				detail: res.data,
			});
		},
	},
};
</script>
<style>
@import "./details.css";
</style>
